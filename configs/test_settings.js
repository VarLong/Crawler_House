const minimist = require('minimist');
const path = require("path")
const utils = require("../artifacts/build/lib/common/utils");
const deployments = utils.checkConfigPath("./configs/deployments.json5");
const capabilities = utils.checkConfigPath("./configs/capabilities.json5");
const merge = require("lodash/object/merge");
const args = minimist(process.argv.slice(2));

function mergeDeploymentAndCapabilitiesJson(settings, deployment) {
    settings = Object.assign(deployments[args.deployment], capabilities[args.device]);
    const envConfigPath = "configs/TestConfigData/";
    const commonVal = utils.checkConfigPath(path.resolve(envConfigPath + "common.json5"));
    const val = utils.checkConfigPath(path.resolve(envConfigPath + deployment + '.json5'));
    settings = merge(settings, commonVal, val);
    return settings;
}

module.exports = (function () {
    let settings = {};
    if (args.env) {
        console.log(args.env);
        const i = args.env.indexOf('-');
        const dep = args.env.slice(0, i);
        const dev = args.env.slice(i + 1, args.env.length);
        args['device'] = dev;
        args['deployment'] = dep;
    }
    if (args.device) {
    }
    if (args.deployment && deployments[args.deployment]) {
        const deploment = deployments[args.deployment];
        settings = mergeDeploymentAndCapabilitiesJson(settings, args.deployment);
    } else {
        console.log(`Can not find deployment ${args.deployment}`);
    }
    return settings;
})();