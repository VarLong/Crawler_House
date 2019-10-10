/// <reference path="./Atom.ts"/>

/**
 *  Page object for #bingeBar page. Includes the following commands :
 */

import { Atom } from "./Atom";
import { CallbackResult } from "../../typings/nightwatch/nightwatch";

const utils = require("../common/utils");

/**
 * BingeBar card used in Reach Client, this page show with feature bingeBar.
 */

export class Tj_GuiHuaJuPage extends Atom {

    constructor(...args: any[]) {
        super();
    }

    public static elements = {
        binner: {
            selector: "#form1 table:nth-child(9)",
            locateStrategy: "css selector"
        },
        main: {
            selector: "#form1 table:nth-child(10)",
            locateStrategy: "css selector"
        },
        content: {
            selector: "#form1 table:nth-child(10) tr td:nth-child(2) table tr:nth-child(6) div table",
            locateStrategy: "css selector"
        },
        indexBox: {
            selector: "#AspNetPager1",
            locateStrategy: "css selector"
        },
        nextButton: {
            selector: "//div[@id='AspNetPager1']/a[contains(text(), '下一页')]",
            locateStrategy: "xpath"
        }
    };

    public waitMainPageVisible(pageIndex: number) {
        this.api.useCss().waitForElementVisible(this.elements["binner"].selector);
        this.api.useCss().waitForElementVisible(this.elements["indexBox"].selector);

        this.api.execute(() => {
            const items = [];
            const itemLenght = document.querySelectorAll("#form1 table:nth-child(10) tr td:nth-child(2) table tr:nth-child(6) div table tr").length - 1;

            // const aaa = document.querySelector("#form1 table:nth-child(10) tr td:nth-child(2) table tr:nth-child(6) div table tr:nth-child(" + (0 + 2) + ") td:nth-child(1)").textContent;

            for (let index = 0; index < itemLenght; index++) {
                const id_application = document.querySelector("#form1 table:nth-child(10) tr td:nth-child(2) table tr:nth-child(6) div table tr:nth-child(" + (index + 2) + ") td:nth-child(1)").textContent;
                const name = document.querySelector("#form1 table:nth-child(10) tr td:nth-child(2) table tr:nth-child(6) div table tr:nth-child(" + (index + 2) + ") td:nth-child(2)").textContent;
                const provider = document.querySelector("#form1 table:nth-child(10) tr td:nth-child(2) table tr:nth-child(6) div table tr:nth-child(" + (index + 2) + ") td:nth-child(3)").textContent;
                const location_area = document.querySelector("#form1 table:nth-child(10) tr td:nth-child(2) table tr:nth-child(6) div table tr:nth-child(" + (index + 2) + ") td:nth-child(4)").textContent;
                const location_detail = document.querySelector("#form1 table:nth-child(10) tr td:nth-child(2) table tr:nth-child(6) div table tr:nth-child(" + (index + 2) + ") td:nth-child(5)").textContent;
                const id_book = document.querySelector("#form1 table:nth-child(10) tr td:nth-child(2) table tr:nth-child(6) div table tr:nth-child(" + (index + 2) + ") td:nth-child(6)").textContent;
                const size = document.querySelector("#form1 table:nth-child(10) tr td:nth-child(2) table tr:nth-child(6) div table tr:nth-child(" + (index + 2) + ") td:nth-child(7)").textContent;
                const date_allow = document.querySelector("#form1 table:nth-child(10) tr td:nth-child(2) table tr:nth-child(6) div table tr:nth-child(" + (index + 2) + ") td:nth-child(8)").textContent;
                const date_publish = document.querySelector("#form1 table:nth-child(10) tr td:nth-child(2) table tr:nth-child(6) div table tr:nth-child(" + (index + 2) + ") td:nth-child(9)").textContent;

                const y = {
                    id_application: id_application,
                    name: name,
                    provider: provider,
                    location_area: location_area,
                    location_detail: location_detail,
                    id_book: id_book,
                    size: size,
                    date_allow: date_allow,
                    date_publish: date_publish
                };
                items.push(y);
            }
            return JSON.stringify(items);
        }, [], (result: CallbackResult) => {
            console.log(`get the data from page: ${pageIndex}`);
            utils.saveTempData(JSON.parse(result.value));
        });

    }
    public clickNext(pageIndex: number) {
        this.waitMainPageVisible(pageIndex);
        this.useXpath().click(this.elements["nextButton"].selector);
    }
}

const v = new Tj_GuiHuaJuPage()["__proto__"];
module.exports = {
    commands: [v],
    elements: Tj_GuiHuaJuPage.elements
};