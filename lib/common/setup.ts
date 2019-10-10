import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

const utils = require("./utils");

module.exports = {
    begin(browser: NightWatchBrowser) {
        console.log("Setup.ts begin");
        utils.initTempData();
    },

    end(browser: NightWatchBrowser) {
        browser.end();
        console.log("Setup.ts end>");
    }
};