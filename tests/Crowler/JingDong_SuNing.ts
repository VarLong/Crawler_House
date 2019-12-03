/**
 * TianMao Jingdong price compare
 */

import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

const setup = require("../../lib/common/setup");

const searchKey = "台式机";
let jd_list: any[] = [];
let sn_list: any[] = [];

module.exports = {
    tags: ["ComparePrice"],
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
        const getDataTool = browser.page.GetProductDetailsTool();
        browser.waitForElementVisible("#key");
        browser.setValue("#key", searchKey);
        browser.click(".search-m .form button:nth-child(5)");
        browser.waitForElementVisible("#J_goodsList");
        getDataTool.getJD_DataList("zonghe", (lists: string) => {
            const zonghe_list = JSON.parse(lists);
            jd_list = jd_list.concat(zonghe_list);
            browser.click("#J_filter .f-line .f-sort  a:nth-child(2)");
            browser.waitForElementNotPresent("#J_loading");
            browser.pause(3000);
            getDataTool.getJD_DataList("xiaoliang", (lists: string) => {
                const xiaoliang_list = JSON.parse(lists);
                jd_list = jd_list.concat(xiaoliang_list);
                browser.click("#J_filter .f-line .f-sort  a:nth-child(3)");
                browser.waitForElementNotPresent("#J_loading");
                browser.pause(3000);
                getDataTool.getJD_DataList("pinglun", (lists: string) => {
                    const xinpin_list = JSON.parse(lists);
                    jd_list = jd_list.concat(xinpin_list);
                });
            });
        });
    },

    "Go to SN for search"(browser: NightWatchBrowser) {
        browser.url("https://www.baidu.com");
        browser.setValue(".bg #kw", "苏宁易购");
        browser.click("#su");
        browser.waitForElementVisible("#content_left");
        browser.getAttribute("#content_left div .ec-pl-container .ec-pc_small_head .ec-pc_title h2 a:nth-child(1)", "href", (result: any) => {
            browser.url(result.value, () => {
                console.log(`Go to SN website done.`);
            });
        });
    },

    "Search the results and get the data for SN."(browser: NightWatchBrowser) {
        const getDataTool = browser.page.GetProductDetailsTool();
        browser.waitForElementVisible(".ng-search");
        browser.setValue("#searchKeywords", searchKey);
        browser.click("#searchSubmit");
        browser.waitForElementVisible("#product-wrap .product-list");
        browser.pause(3000);
        getDataTool.getSN_DataList("zonghe", (lists: string) => {
            // sortBy 综合
            const zonghe_list = JSON.parse(lists);
            sn_list = sn_list.concat(zonghe_list);
            browser.click("#second-filter .second-up .sort span:nth-child(2)");
            browser.pause(3000);
            getDataTool.getSN_DataList("xiaoliang", (lists: string) => {
                // sortBy 销量
                const xiaoliang_list = JSON.parse(lists);
                sn_list = sn_list.concat(xiaoliang_list);
                browser.click("#second-filter .second-up .sort span:nth-child(3)");
                browser.pause(3000);
                getDataTool.getSN_DataList("pinglun", (lists: string) => {
                    // sortBy 销量
                    const pinglun_list = JSON.parse(lists);
                    sn_list = sn_list.concat(pinglun_list);
                    console.log(sn_list);
                });
            });
        });
    }
};
