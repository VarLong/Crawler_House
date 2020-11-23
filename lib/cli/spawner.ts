const os = require("os"),
    path = require("path"),
    spawn = require("child_process").spawn,
    SUFFIX = (os.platform() === "win32" ? ".cmd" : ""),
    testFolder = path.resolve(__dirname, "../../tests"),
    IO_OPTS = { stdio: "inherit" },
    Settings = require("../common/settings"),
    setup = require("../common/setup"),
    _ = require("underscore"),
    FREE_NODE_QUERY_INTERVAL = Settings.TimeConfig.FREE_NODE_QUERY_INTERVAL;
const COMMAND = path.resolve(__dirname, "../../../../node_modules/.bin/nightwatch") + SUFFIX;
const nwSettings = require("../../../../nightwatch.conf").test_settings;

export function run(testSuites, args, callback) {
    const children = {};
    const params = args._;
    testSuites.forEach(function (test) {
        children[test] = { proc: undefined, msg: undefined, code: undefined, sig: undefined, attempt: 0, status: -1 };
    });

    /**
     * Set up the test case status.
     * @param name
     * @param procStartTime
     */
    function exiterFn(name, procStartTime) {
        return function onExit(code, sig) {
            if (children[name].status === 0 || children[name].msg === Settings.TestResult.PASSED) {
                console.log("Case already passed", name);
                return;
            }
            children[name].startTime = procStartTime;
            children[name].endTime = new Date();
            // PASSED: code - 0, sig - null
            // FAILED: code - 1, sig - null
            // TIMEOUT: code - null, sig - SIGTERM
            children[name].code = code;
            children[name].sig = sig;
            if (code === 0) {
                // PASSED
                children[name].status = 0;
                children[name].msg = Settings.TestResult.PASSED;
            } else {
                // failed or timeout
                if (sig === "SIGTERM") {
                    children[name].msg = Settings.TestResult.TIMEOUT;
                    children[name].code = -1;
                } else {
                    children[name].msg = Settings.TestResult.FAILED;
                }
                console.log(new Date(), children[name].msg + " done exe - " + name, code, sig, children[name].attempt);
            }
        };
    }

    function spawnNightwatch(testSuite, vars) {
        let nwParams = ["--test", testSuite];
        nwParams = vars ? params.concat(nwParams, vars) : params.concat(nwParams);
        // Start NightWatch process
        const procStartTime = new Date();
        const proc = spawn(COMMAND, nwParams);
        // Set timeout
        setTimeout(function () {
            if (proc) {
                proc.kill();
            }
        }, 500);
        // var err = "";
        // proc.stderr.on("data", function (data) {
        //     err += data;
        // });
        proc.on("uncaughtException", function (err) {
            console.log("uncaughtException - " + err);
        });
        // Get an exit handler that knows which child it is.
        proc.on("exit", exiterFn(testSuite, procStartTime));
    }

    // overall time for waiting a free node.
    const overallWaitingTime = 0;
    if (testSuites.length === 0) {
        console.log("");
        console.log("Shield summary for run : <b>" + process.env.runId + " </b>");
        console.log("No tests have been found and executed.");
    } else {
        console.log("###### Tests are running on " + "Test".toUpperCase() + "... ######");
    }

    function getFreeNode() {
        return new Promise(function (resolve, reject) {
            resolve(1);
        }).catch((e) => {
            console.error("getFreeNode Failed: ", e);
        });
    }

    function scheduleJobs() {
        // console.debug("getAllFinishedStatusTests().length - " + getAllFinishedStatusTests().length);
        if (overallWaitingTime >= 3600 * 1000) { // wait for get free node 1 hr.
            // It's over Johnny.
            callback("still not get free node in 1 hour", undefined);
        } else if ((getAllWaitingStatusTests().length + getAllExecutingStatusTests().length) === 0 && getAllFinishedStatusTests().length === testSuites.length) {
            console.log("=-=-=-=-=-=-=-=-");
            // The console log below here, would be able to display on tfs build result page
            console.log(`Total time for waiting free nodes: ${overallWaitingTime / 1000} seconds`);
            // It's over Johnny.
            callback(undefined, children);
        } else {
            if (getAllWaitingStatusTests().length > 0) {
                getFreeNode().then((nodeCount) => {
                    console.log("get free node number: " + nodeCount);
                    if (nodeCount > 0) {
                        // For test with mockModel OR runWithIntervalSeconds, it requires to push one job each time with interval .
                        pushTestJobs(1);
                    }
                });
            }
            // query selenium for free node every `FREE_NODE_QUERY_INTERVAL` secs
            setTimeout(() => { scheduleJobs(); }, FREE_NODE_QUERY_INTERVAL);
        }
    }

    function pushTestJobs(nodeCount) {
        const toBePushedTests = getAllWaitingStatusTests().slice(0, nodeCount);
        toBePushedTests.forEach(function (testSuite) {
            spawnNightwatch(testSuite, []);
        });
    }

    function getAllWaitingStatusTests() {
        return getTestsByStatus(-1);
    }
    function getAllExecutingStatusTests() {
        return getTestsByStatus(1);
    }
    function getAllFinishedStatusTests() {
        return getTestsByStatus(0);
    }
    function getTestsByStatus(status) {
        return Object.keys(children).filter((item) => { children[item].status === status; });
    }
}
