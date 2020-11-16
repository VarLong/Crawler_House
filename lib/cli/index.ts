const minimist = require('minimist');
const configs = require('../../../../nightwatch.conf');
const groupify = require('./groupify');
const argv = process.argv.slice(2);
const allVars = [];


function reporter(results, callback) {
    console.log(results);
    callback(-1);
}
/*
 * Run ID for a single run will be generated using the buildStartTime plus a four digital number
 * to avoid multiple runs started at the same time.
 * Each digital is generated randomly.
 */
function generateRunId(buildStartTime) {
    var d = buildStartTime.getTime().toString();
    var uuid = 'xxxx'.replace(/[x]/g, function (x) {
        return Math.floor(Math.random() * 10).toString();
    });
    return String(d + uuid);
}

function setRunId() {
    process.env.runId = generateRunId(new Date());
}

/**
 * node.exe processes still exist after run finished on Windows OS. Kill them to unblock the Shield Folder.
 * @param exitCode 
 */
function killProcess(exitCode) {
    if (process.platform === 'win32') {
        var workingDic = process.cwd().replace(new RegExp("\\\\", "g"), '\\\\');
        var cp = require('child_process');
        cp.exec("wmic process where (name='node.exe' and commandline like \"%" + workingDic + "%\") call terminate", function (error, stdout, stderr) {
            if (error !== null) {
                console.log('kill node error: ' + error);
            }
            process.exit(exitCode);
        });
    } else {
        process.exit(exitCode);
    }
}

function done(err, results) {
    var exitCode = -1;
    if (err) {
        console.error('\nCrawler stopped due to error: ' + err);
        process.exit(exitCode);
    } else {
        reporter(results, killProcess);
    }
}


function run(args, callback) {
    let env;
    if (args.env && typeof args.env === 'string') {
        env = args.env;
        process.env.deployment = env.substr(0, env.indexOf('-'));
        process.env.device = env.substr(env.indexOf('-') + 1);
    }
    if (args.deployment && args.device) {
        env = args.deployment + '-' + args.device;
        argv.push('--env', env);
        process.env.deployment = args.deployment;
        process.env.device = args.device;
    }
    // Set custom reporter
    if (configs.hasOwnProperty('custom_reporter_path')) {
        argv.push('--reporter', configs.custom_reporter_path);
    }

    // Add Build Name for reporting
    setRunId();

    var trimmedArgs = {};
    argv.forEach(function (val, i) {
        if (i % 2 === 1) return;
        if (val === "--var") {
            allVars.push(argv[i + 1]);
        } else {
            trimmedArgs[val] = argv[i + 1];
        }
    });

    delete trimmedArgs["--device"];
    delete trimmedArgs["--tag"];

    for (var i in trimmedArgs) {
        args._.push(i, trimmedArgs[i]);
    }
    for (var i in allVars) {
        args._.push("--var", allVars[i]);
    }
    // Begin.
    groupify(args, callback);
}

if (require.main === module) {
    run(minimist(argv), done);
}