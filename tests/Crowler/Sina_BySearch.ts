/**
 * TianMao Jingdong price compare
 */

import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

const setup = require("../../lib/common/setup");

module.exports = {
    tags: ["Search"],
    before(browser: NightWatchBrowser) {
        setup.begin(browser);
        const landingPage = browser.page.LandingPage();
        landingPage.login();
    },

    after(browser: NightWatchBrowser) {
        setup.end(browser);
    },

    "Search by key"(browser: NightWatchBrowser) {
        browser.page.Search_Sina().go();
        browser.page.Search_Sina().getDetailUrls();
    }
};
