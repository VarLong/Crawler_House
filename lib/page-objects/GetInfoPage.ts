/// <reference path="./Atom.ts"/>

import { Atom } from "./Atom";
import { CallbackResult } from "../../typings/nightwatch/nightwatch";

export class GetInfoPage extends Atom {

    constructor(...args: any[]) {
        super();
    }

    public static elements = {
        jd_list: {
            selector: "#J_goodsList ul li",
            locateStrategy: "css selector"
        },
        nextButton: {
            selector: "//div[@id='AspNetPager1']/a[contains(text(), '下一页')]",
            locateStrategy: "xpath"
        }
    };

    public getJD_DataList() {
        this.api.useCss().waitForElementVisible(this.elements["jd_list"].selector);
        this.api.execute(() => {
            const items = [];
            const itemLenght = document.querySelectorAll("#J_goodsList ul li").length - 1;

            for (let index = 0; index < itemLenght; index++) {
                const jd_price = document.querySelector("#J_goodsList ul li:nth-child(" + (index + 1) + ") .p-price").textContent.trim();
                const jd_name = document.querySelector("#J_goodsList ul li:nth-child(" + (index + 1) + ") .p-name").textContent.trim().replace(/\r|\n|\t/g, "");
                const jd_commit = document.querySelector("#J_goodsList ul li:nth-child(" + (index + 1) + ") .p-commit").textContent.trim();
                const jd_shop = document.querySelector("#J_goodsList ul li:nth-child(" + (index + 1) + ") .p-shop").textContent.trim();
                const jd_url = "https:" + document.querySelector("#J_goodsList ul li:nth-child(" + (index + 1) + ") .p-img a").getAttribute("href").trim();

                const y = {
                    price: jd_price,
                    name: jd_name,
                    commit: jd_commit,
                    shop: jd_shop,
                    url: jd_url
                };
                items.push(y);
            }
            return JSON.stringify(items);
        }, [], (result: CallbackResult) => {
            console.log(result);
            return result.value;
        });
    }

}

const v = new GetInfoPage()["__proto__"];
module.exports = {
    commands: [v],
    elements: GetInfoPage.elements
};