const chromedriver = require("chromedriver");
const minimist = require('minimist');
const fs = require("fs");
const path = require("path")
const utils = require("./artifacts/build/lib/common/utils");
const deployments = utils.checkConfigPath("./configs/deployments.json5");
const capabilities = utils.checkConfigPath("./configs/capabilities.json5");
const merge = require("lodash/object/merge");
const args = minimist(process.argv.slice(2));
const test_settings = require("./configs/test_settings");


if (!process.env.runId) {
    process.env.runId = process.env.buildStartTime ? new Date(process.env.buildStartTime).getTime().toString() + "0000" : function () {
        process.env.buildStartTime = new Date();
        return new Date(process.env.buildStartTime).getTime().toString() + "0000";
    }();
}

utils.createDir('temp_data');

const log = console.log;
console.log = function () {
    const args = [].slice.call(arguments);
    log.apply(console.log, [utils.formattedTimestamp()].concat(args));
};

module.exports = (function (settings) {
    if (args.env) {
        const i = args.env.indexOf('-');
        const dep = args.env.slice(0, i);
        const dev = args.env.slice(i + 1, args.env.length);
        args['device'] = dev;
        args['deployment'] = dep;
    }

    if (args.device) {
        // const dev = args.device;
        // if (capabilities[dev]) {
        //     console.log(`Add device ${dev} to test run.`);
        //     for (const key in capabilities[dev]) {
        //         settings['test_settings']['desiredCapabilities'] = capabilities[dev][key];
        //     }
        // } else {
        //     console.log(`Not find device ${dev} in capabilities.`);
        // }
    }

    if (args.deployment && deployments[args.deployment]) {
        const deploment = deployments[args.deployment];
        settings['test_settings'][args.env] = test_settings;
    } else {
        console.log(`Can not find deployment ${args.deployment}`);
    }

    return settings;
})(require('./configs/defaults.json'));