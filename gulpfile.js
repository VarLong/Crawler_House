const gulp = require("gulp"),
    { series } = require("gulp"),
    gulpts = require("gulp-typescript"),
    sourcemaps = require("gulp-sourcemaps"),
    del = require("del"),
    tsProject = gulpts.createProject("tsconfig.json"),
    gulptslint = require("gulp-tslint"),
    builddir = "artifacts/build/",
    sources = {
        ts: "+(lib|tests)/**/*.ts",
        js: "+(lib|tests)/**/*.js*",
        mt: "+(lib|tests)/**/.placeholder", // to include "empty" directories
    };

function onError(callback) {
    process.exit(1);
    callback();
}

/**
 * Fiddler proxy start and stop functionality is written for automation test scripts.
 * Whenever any automation script requires fiddler, it can use the below scripts.
 * For CustomRules js file the gulp dest path can be changed based on user preference. For that the registry editor key(LastLoadedFile) value needs to be updated.
 * For HTTPS decryption, update the registry editor keys as below:
 * CaptureHTTPS - True , HTTPSProcessFilter - 0x00000001, IgnoreServerCertErrors - True
 */
gulp.task('fiddlerProxyStart', function () {
    gulp.src('./Fiddler/proxyRules/CustomRules.js').pipe(gulp.dest(process.env.USERPROFILE + "/Documents/Fiddler2/Scripts"));
    exec('start "" "./Fiddler/Fiddler" -quiet -noversioncheck', function () {
    });

});

gulp.task('fiddlerProxyStop', function () {
    exec('"./Fiddler/execaction" stop', function () {
    });

});

function js() {
    return gulp.src([sources.js, sources.mt]).pipe(gulp.dest(builddir));
}

function ts() {
    return gulp
        .src(sources.ts)
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .on("error", onError)
        .js.pipe(sourcemaps.write("."))
        .pipe(gulp.dest(builddir));
}

function tslint() {
    return gulp
        .src(sources.ts)
        .pipe(
            gulptslint({
                formatter: "verbose",
                sort: true,
            })
        )
        .pipe(
            gulptslint.report({
                summarizeFailureOutput: true,
            })
        );
}

function clean() {
    return del(builddir + "*");
}

exports.default = series(clean, js, ts, tslint);
exports.clean = series(clean);