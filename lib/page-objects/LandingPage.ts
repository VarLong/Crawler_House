/// <reference path="../../typings/tsd.d.ts" />
import { Atom } from "./Atom";

const pageElements = {
    submit: {
        selector: ".tn-tab-custom-login",
        locateStrategy: "css selector"
    }
};

class LandingPage extends Atom {
    public login() {
        const browser = this.api;
        browser.url("https://news.sina.com.cn/");
        this.waitForElementVisible("@submit");
        browser.click(".tn-tab-custom-login");
    }
}

const commands = new LandingPage()["__proto__"];
module.exports = {
    commands: [commands],
    elements: pageElements
};