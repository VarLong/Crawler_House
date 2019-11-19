/**
 * TianMao Jingdong price compare
 */

import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

const setup = require("../../lib/common/setup");

const searchKey = "台式机";

module.exports = {
    tags: ["TJ"],
    before(browser: NightWatchBrowser) {
        setup.begin(browser, "./temp_data/Tianmao_JD.json");
    },

    after(browser: NightWatchBrowser) {
        setup.end(browser);
    },

    "Go to JD for search"(browser: NightWatchBrowser) {
        browser.url("https://www.baidu.com");
        browser.setValue(".bg #kw", "京东");
        browser.click("#su");
        browser.waitForElementVisible("#content_left");
        browser.getAttribute("#content_left div .ec-pl-container .ec-pc_small_head .ec-pc_title h2 a:nth-child(1)", "href", (result: any) => {
            browser.url(result.value, () => {
                console.log(`Go to JD website done.`);
            });
        });
    },

    "Search the results and get the data for JD."(browser: NightWatchBrowser) {
        browser.waitForElementVisible("#key");
        browser.setValue("#key", searchKey);
        browser.click(".search-m .form button:nth-child(5)");
        browser.waitForElementVisible("#J_goodsList");
    },

    "Go to TM for search"(browser: NightWatchBrowser) {
        browser.url("https://www.baidu.com");
        browser.setValue(".bg #kw", "天猫");
        browser.click("#su");
        browser.waitForElementVisible("#content_left", 20000);
        browser.getAttribute("#content_left div .ec-pl-container .ec-pc_small_head .ec-pc_title h2 a:nth-child(1)", "href", (result: any) => {
            browser.url(result.value, () => {
                console.log(`Go to TM website done.`);
            });
        });

    },

    "Search the results and get the data for TM."(browser: NightWatchBrowser) {

    }
};
