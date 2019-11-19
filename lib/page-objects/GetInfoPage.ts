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
        tm_list: {
            selector: "#J_ItemList .product",
            locateStrategy: "css selector"
        },
        t_list: {
            selector: "//div[@id='AspNetPager1']/a[contains(text(), '下一页')]",
            locateStrategy: "xpath"
        }
    };

    public getJD_DataList(sortBy: string, callback: any) {
        this.api.useCss().waitForElementVisible(this.elements["jd_list"].selector);
        this.api.execute((sortBy: string) => {
            const items = [];
            const itemLenght = document.querySelectorAll("#J_goodsList ul li").length - 1;

            for (let index = 0; index < itemLenght; index++) {
                const jd_price = document.querySelector("#J_goodsList ul li:nth-child(" + (index + 1) + ") .p-price").textContent.trim();
                const jd_name = document.querySelector("#J_goodsList ul li:nth-child(" + (index + 1) + ") .p-name").textContent.trim().replace(/\r|\n|\t/g, " ");
                const jd_commit = document.querySelector("#J_goodsList ul li:nth-child(" + (index + 1) + ") .p-commit").textContent.trim().replace(/\r|\n|\t/g, " ");
                const jd_shop = document.querySelector("#J_goodsList ul li:nth-child(" + (index + 1) + ") .p-shop").textContent.trim();
                const jd_url = "https:" + document.querySelector("#J_goodsList ul li:nth-child(" + (index + 1) + ") .p-img a").getAttribute("href").trim();

                const y = {
                    website: "JD.com",
                    price: jd_price,
                    name: jd_name,
                    commit: jd_commit,
                    shop: jd_shop,
                    url: jd_url,
                    sortBy: sortBy
                };
                items.push(y);
            }
            return JSON.stringify(items);
        }, [sortBy], (result: CallbackResult) => {
            callback(result.value);
        });
    }

    public getTM_DataList(sortBy: string, callback: any) {
        this.api.useCss().waitForElementVisible(this.elements["tm_list"].selector);
        this.api.execute(() => {
            const items = [];
            const itemLenght = document.querySelectorAll("#J_ItemList .product").length - 1;

            for (let index = 0; index < itemLenght; index++) {
                const tm_price = document.querySelector("#J_ItemList div:nth-child(" + (index + 1) + ") .productPrice").textContent.trim();
                const tm_name = document.querySelector("#J_ItemList div:nth-child(" + (index + 1) + ") .productTitle ").textContent.trim().replace(/\r|\n|\t/g, " ");
                const tm_deal = document.querySelector("#J_ItemList div:nth-child(" + (index + 1) + ") .productStatus span:nth-child(1)").textContent.trim().replace(/\r|\n|\t/g, " ");
                const tm_commit = document.querySelector("#J_ItemList div:nth-child(" + (index + 1) + ") .productStatus span:nth-child(2)").textContent.trim().replace(/\r|\n|\t/g, " ");
                const tm_shop = document.querySelector("#J_ItemList div:nth-child(" + (index + 1) + ") .productShop").textContent.trim();
                const tm_url = "https:" + document.querySelector("#J_ItemList div:nth-child(" + (index + 1) + ") .productImg-wrap a").getAttribute("href").trim();

                const y = {
                    website: "TM.com",
                    price: tm_price,
                    name: tm_name,
                    commit: tm_commit,
                    deal: tm_deal,
                    shop: tm_shop,
                    url: tm_url,
                    sortBy: sortBy
                };
                items.push(y);
            }
            return JSON.stringify(items);
        }, [], (result: CallbackResult) => {
            callback(result.value);
        });
    }

}

const v = new GetInfoPage()["__proto__"];
module.exports = {
    commands: [v],
    elements: GetInfoPage.elements
};