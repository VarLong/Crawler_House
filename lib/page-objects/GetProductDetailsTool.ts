/// <reference path="./Atom.ts"/>

import { Atom } from "./Atom";
import { CallbackResult } from "../../typings/nightwatch/nightwatch";

export class GetProductDetailsTool extends Atom {

    constructor(...args: any[]) {
        super();
    }

    public static elements = {
        jd_list: {
            selector: "#J_goodsList ul li",
            locateStrategy: "css selector"
        },
        sn_list: {
            selector: "#product-wrap .product-list",
            locateStrategy: "css selector"
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

    public getSN_DataList(sortBy: string, callback: any) {
        this.api.useCss().waitForElementVisible(this.elements["sn_list"].selector);
        this.api.execute((sortBy: string) => {
            const items = [];
            for (let index = 0; index < 20; index++) {
                let element: any;
                element = document.querySelector("#product-wrap .product-list .general li:nth-child(" + (index + 1) + ") .price-box");
                const sn_price = element ? element.textContent.trim() : "";
                element = document.querySelector("#product-wrap .product-list .general li:nth-child(" + (index + 1) + ") .title-selling-point");
                const sn_name = element ? element.textContent.trim().replace(/\r|\n|\t/g, " ") : "";
                element = document.querySelector("#product-wrap .product-list .general li:nth-child(" + (index + 1) + ") .evaluate-old");
                const sn_deal = element ? element.textContent.trim().replace(/\r|\n|\t/g, " ") : "";
                element = document.querySelector("#product-wrap .product-list .general li:nth-child(" + (index + 1) + ") .store-stock");
                const sn_shop = element ? element.textContent.trim().replace(/\r|\n|\t/g, " ") : "";
                element = document.querySelector("#product-wrap .product-list .general li:nth-child(" + (index + 1) + ") .title-selling-point a");
                const sn_url = element ? "https:" + element.getAttribute("href").trim() : "";

                const y = {
                    website: "TM.com",
                    price: sn_price,
                    name: sn_name,
                    deal: sn_deal,
                    shop: sn_shop,
                    url: sn_url,
                    sortBy: sortBy
                };
                items.push(y);
            }
            return JSON.stringify(items);
        }, [sortBy], (result: CallbackResult) => {
            callback(result.value);
        });
    }

}

const v = new GetProductDetailsTool()["__proto__"];
module.exports = {
    commands: [v],
    elements: GetProductDetailsTool.elements
};