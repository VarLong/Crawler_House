import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

const utils = require("./utils");

module.exports = {
    tags: ["CI"],
    begin(browser: NightWatchBrowser, dataPath: string) {
        console.log("Setup.ts begin");
    },

    end(browser: NightWatchBrowser) {
        browser.end();
        console.log("Setup.ts end>");
    }
};