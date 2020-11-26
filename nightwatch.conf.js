const chromedriver = require("chromedriver");
const minimist = require('minimist');
const utils = require("./artifacts/build/lib/common/utils");
const args = minimist(process.argv.slice(2));
const test_settings = require("./configs/test_settings");

// make runId
if (!process.env.runId) {
    process.env.runId = process.env.buildStartTime ? new Date(process.env.buildStartTime).getTime().toString() + "0000" : function () {
        process.env.buildStartTime = new Date();
        return new Date(process.env.buildStartTime).getTime().toString() + "0000";
    }();
}
// make temp data folder.
utils.createDir('temp_data');
const log = console.log;
console.log = function () {
    const args = [].slice.call(arguments);
    log.apply(console.log, [utils.formattedTimestamp()].concat(args));
};
module.exports = (function (settings) {
    settings['test_settings'][args.env] = test_settings;
    return settings;
})(require('./configs/defaults.json'));