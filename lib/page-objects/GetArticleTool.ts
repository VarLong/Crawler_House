/// <reference path='../../typings/tsd.d.ts' />
import { CallbackResult, NightWatchBrowser } from "../../typings/nightwatch/nightwatch";

const toutiaoCommands = {
    goToTouTiao: function () {
        const browser = this;
        browser.api.url("https://www.toutiao.com/search/", (result: any) => {
            browser.api.waitForElementVisible(".search-content");
        });
    },
    searchForKey(keyValue: string, callback: Function) {
        this.api.setValue(".search-content input:nth-child(1)", keyValue);
        this.api.click(".search-btn");
        this.api.waitForElementVisible(".container");
        this.api.waitForElementVisible(".feedBox");
        this.api.waitForElementVisible(".feedBox .sections .articleCard");
        this.api.execute(() => {
            const items = [];
            const elementLength = document.querySelectorAll(".feedBox .sections .articleCard").length - 1;
            for (let index = 0; index < elementLength; index++) {
                const element = document.querySelector(".feedBox .sections .articleCard:nth-child(" + (index + 1) + ")");
                if (element) {
                    const tt_title = document.querySelector(".feedBox .sections .articleCard:nth-child(" + (index + 1) + ") .rbox-inner .title-box").textContent.trim();
                    const tt_user = document.querySelector(".feedBox .sections .articleCard:nth-child(" + (index + 1) + ") .rbox-inner .y-box .y-left .J_source").textContent.trim();
                    const tt_comment = document.querySelector(".feedBox .sections .articleCard:nth-child(" + (index + 1) + ") .rbox-inner .y-box .y-left .comment").textContent.trim();
                    const tt_url = "https://www.toutiao.com" + document.querySelector(".feedBox .sections .articleCard:nth-child(" + (index + 1) + ") .rbox-inner .title-box a").getAttribute("href").trim();
                    const y = {
                        website: "toutiao.com",
                        title: tt_title,
                        userName: tt_user,
                        url: tt_url,
                        comment: tt_comment
                    };
                    items.push(y);
                }
            }
            return JSON.stringify(items);
        }, [], (result: CallbackResult) => {
            console.log(result.value);
            callback(result.value);
        });
    }
};

const baiduCommands = {
    waitForIndicatorToBeVisible: function () {

    }
};

module.exports = {
    sections: {
        TOUTIAO: {
            selector: ".index-content",
            commands: [toutiaoCommands],
            elements: {}
        },

        BAIDU: {
            selector: ".index-content",
            commands: [baiduCommands],
            elements: {}
        }
    }
};