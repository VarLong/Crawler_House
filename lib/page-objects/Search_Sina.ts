/// <reference path="../../typings/tsd.d.ts" />
import { Atom } from "./Atom";
import { CallbackResult } from "../../typings/nightwatch/nightwatch";
const utils = require("../common/utils");

class Search_Sina extends Atom {
    public static searchUrl = "https://search.sina.com.cn";
    public static searchParameters = {
        q: "钱钟书",
        c: "news",
        by: "",
        from: "",
        t: "",
        sort: "count",
        range: "title",
    };
    public static elements = {
        searchResults: {
            selector: "#result",
            locateStrategy: "css selector"
        },
        articleUrl: {
            selector: "#result .box-result h2 a",
            locateStrategy: "css selector"
        }
    };
    public go() {
        const browser = this.api;
        const surl = Search_Sina.searchUrl + utils.obj2Url(Search_Sina.searchParameters);
        browser.url(surl);
        this.waitForElementVisible("@searchResults");
    }
    public getDetailUrls() {
        const pageAPI = this.api;
        const page = this;
        pageAPI.elements("css selector", page.elements["articleUrl"].selector, (result: CallbackResult) => {
            console.log(result.status);
            if (result.status === 0) {
                for (let index = 0; index < result.value.length; index++) {
                    const element = result.value[index];
                    pageAPI.elementIdAttribute(result.value[index].ELEMENT, "href", (id: CallbackResult) => {
                        pageAPI.assert.ok(id.status === 0, "Get the id of showcard. id: " + id.value);
                    });
                }
            }
        });
    }
}

const commands = new Search_Sina()["__proto__"];
module.exports = {
    commands: [commands],
    elements: Search_Sina.elements
};