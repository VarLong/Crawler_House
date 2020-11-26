/**
 * TianMao Jingdong price compare
 */

import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

const setup = require("../../lib/common/setup");

module.exports = {
    tags: ["Article"],
    before(browser: NightWatchBrowser) {
        setup.begin(browser);
        const landingPage = browser.page.LandingPage();
        landingPage.login();
    },

    after(browser: NightWatchBrowser) {
        setup.end(browser);
    },

    "Go to TouTioa and search by keywork"(browser: NightWatchBrowser) {
    }
};
