
var gulp = require('gulp'),
    npmi = require('gulp-install'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    tslint = require("gulp-tslint"),
    exec = require('child_process').exec,

    tsOpts = {
        module: "commonjs",
        noImplicitAny: true,
        suppressImplicitAnyIndexErrors: true,
        forceConsistentCasingInFileNames: true,
        sourceMap: true
    },

    builddir = 'artifacts/build/',
    sources = {
        ts: '+(lib|tests)/**/*.ts',
        js: '+(lib|tests)/**/*.js*',        // includes .js, .json, .json5
        mt: '+(lib|tests)/**/.placeholder', // to include "empty" directories
    };

function onError() {
    process.exit(1);
}    

gulp.task('js', function () {
    return gulp
        .src([sources.js, sources.mt])
        .pipe(gulp.dest(builddir));
});

gulp.task('ts', function () {
    return gulp
        .src(sources.ts)
        .pipe(sourcemaps.init())
        .pipe(ts(tsOpts,ts.reporter.fullReporter(true))) // enforcing full error report for 'ts' task failures
        .on('error', onError)
        .js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(builddir));
});

gulp.task("tslint", function() {
    gulp.src(sources.ts)
        .pipe(tslint({
            formatter: "verbose",
            sort: true
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }))
});

gulp.task('npmi', function () {
    return gulp
        .src('package.json')
        .pipe(npmi());
});

gulp.task('clean', function (cb) {
    return del(builddir + '*', cb);
});

gulp.task('watch', ['default'], function () {
    gulp.watch([sources.ts, sources.js], ['ts', 'js']);
});

gulp.task('default', ['clean'], function () {
    gulp.start('js', 'ts', "tslint");
});
