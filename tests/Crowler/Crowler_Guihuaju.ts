/**
 * Login and Logout
 */

/**
 * Login, Logout
 */

import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

const setup = require("../../lib/common/setup");

module.exports = {
    tags: ["CI"],
    before(browser: NightWatchBrowser) {
        setup.begin(browser);
    },

    after(browser: NightWatchBrowser) {
        setup.end(browser);
    },

    "Log in Git hub"(browser: NightWatchBrowser) {
        browser.url("http://ghhzrzy.tj.gov.cn/chaxun.aspx?id=CK0701&tablename=data_jianshe");
    },

    "Log in and check for logo"(browser: NightWatchBrowser) {
        const gitHubPage = browser.page.Tj_GuiHuaJuPage();
        gitHubPage.waitMainPageVisible();
        for (let index = 0; index < 500; index++) {
            gitHubPage.clickNext(index + 2);
        }
        // gitHubPage.clickNext();
        // gitHubPage.clickNext();
        // gitHubPage.clickNext();
        // browser.compareImage(".btn-primary-mktg");

    }
};
