import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

const utils = require("./utils");

module.exports = {
    begin(browser: NightWatchBrowser, dataPath: string) {
        console.log("Setup.ts begin");
        utils.initTempData(dataPath);
    },

    end(browser: NightWatchBrowser) {
        browser.end();
        console.log("Setup.ts end>");
    }
};