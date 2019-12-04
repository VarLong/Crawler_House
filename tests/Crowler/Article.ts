/**
 * TianMao Jingdong price compare
 */

import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

const setup = require("../../lib/common/setup");

const searchKey = "台式机";

module.exports = {
    tags: ["Article"],
    before(browser: NightWatchBrowser) {
        setup.begin(browser, "./temp_data/Tianmao_SN.json");
    },

    after(browser: NightWatchBrowser) {
        setup.end(browser);
    },

    "Go to TouTioa and search by keywork"(browser: NightWatchBrowser) {
        const article = browser.page.GetArticleTool();
        console.log(article.section.TOUTIAO);
        const toutiaoTool = article.section.TOUTIAO;
        toutiaoTool.goToTouTiao();
        toutiaoTool.searchForKey(searchKey, (items: any) => {
            console.log(items);
        });
    }
};
