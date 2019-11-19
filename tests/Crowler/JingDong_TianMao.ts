/**
 * TianMao Jingdong price compare
 */

import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

const setup = require("../../lib/common/setup");

const searchKey = "台式机";
let jd_list: any[] = [];
let tm_list: any[] = [];
const userName = "";
const password = "";

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
        const getDataPage = browser.page.GetInfoPage();
        browser.waitForElementVisible("#key");
        browser.setValue("#key", searchKey);
        browser.click(".search-m .form button:nth-child(5)");
        browser.waitForElementVisible("#J_goodsList");
        getDataPage.getJD_DataList("zonghe", (lists: string) => {
            // sortBy 综合
            const zonghe_list = JSON.parse(lists);
            jd_list = jd_list.concat(zonghe_list);
            // sortBy 销量
            browser.click("#J_filter .f-line .f-sort  a:nth-child(2)");
            browser.waitForElementNotPresent("#J_loading");
            getDataPage.getJD_DataList("xiaoliang", (lists: string) => {
                const xiaoliang_list = JSON.parse(lists);
                jd_list = jd_list.concat(xiaoliang_list);
                // sortBy 评论
                browser.click("#J_filter .f-line .f-sort  a:nth-child(3)");
                browser.waitForElementNotPresent("#J_loading");
                getDataPage.getJD_DataList("pinglun", (lists: string) => {
                    const xinpin_list = JSON.parse(lists);
                    jd_list = jd_list.concat(xinpin_list);
                });
            });
        });
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
        const getDataPage = browser.page.GetInfoPage();
        browser.waitForElementVisible("#mq");
        browser.click("#login-info .sn-login");
        browser.waitForElementVisible("#J_LoginBox");
        browser.setValue("#TPL_username_1", userName);
        browser.setValue("#TPL_password_1", password);
        browser.click("#J_SubmitStatic");

        browser.waitForElementVisible("#mq");
        browser.setValue("#mq", searchKey);
        browser.click("#mallSearch .mallSearch-input button:nth-child(3)");
        browser.waitForElementVisible("#J_ItemList");
        getDataPage.getTM_DataList("zonghe", (lists: string) => {
            // sortBy 综合
            const zonghe_list = JSON.parse(lists);
            tm_list = tm_list.concat(zonghe_list);
            console.log(tm_list);
            // sortBy 销量
            // browser.click("#J_filter a:nth-child(4)");
            // browser.waitForElementNotPresent("#J_loading");
            // getDataPage.getTM_DataList("xiaoliang", (lists: string) => {
            //     const xiaoliang_list = JSON.parse(lists);
            //     tm_list = tm_list.concat(xiaoliang_list);
            //     // sortBy 评论
            //     browser.click("#J_filter a:nth-child(2)");
            //     browser.waitForElementNotPresent("#J_loading");
            //     getDataPage.getTM_DataList("pinglun", (lists: string) => {
            //         const xinpin_list = JSON.parse(lists);
            //         tm_list = tm_list.concat(xinpin_list);
            //     });
            // });
        });
    }
};
