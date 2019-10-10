/**
 * Create a screenshot by css sclector, and save in the path. The screenshot was named by the selector.
 * @param cssSelector: Css selector of the screenshot which need to be compared.
 * @param path: The path of the screenshot will be saved. If there is no correct path, it will correct the folders.
 * @param callback: Optional callback function to be called when the command finishes.
 * @returns {}
 */

import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";
const fs = require("fs");
const sharp = require("sharp");

module.exports.command = function (cssSelector: string, path: string, callback?: any) {
    const browser = <NightWatchBrowser>this;
    browser.useCss().waitForElementVisible(cssSelector);
    const screenshotFileTempPath = `${path}/${cssSelector}_temp.png`;
    const screenshotFilePath = `${path}/${cssSelector}.png`;
    const screenshotPaths = path.replace(/\\/, "/").split("/");
    let tempPath = ".";
    for (let index = 1; index < screenshotPaths.length; index++) {
        tempPath = tempPath + "/" + screenshotPaths[index];
        if (!fs.existsSync(tempPath)) {
            fs.mkdirSync(tempPath);
        }
    }
    browser.perform(() => {
        browser.execute((cssSelector: string) => {
            const element = document.querySelector(cssSelector);
            return element && element.getBoundingClientRect();
        }, [cssSelector], (result: any) => {
            browser.assert.equal(result.status, 0, `get the element rect with ${screenshotFilePath}`);
            browser.saveScreenshot(screenshotFileTempPath, () => {
                const rect = result.value;
                sharp(screenshotFileTempPath).extract({
                    left: Math.ceil(rect.left),
                    top: Math.ceil(rect.top),
                    width: Math.floor(rect.width),
                    height: Math.floor(rect.height)
                }).toFile(screenshotFilePath, (error: any) => {
                    browser.assert.equal(!error, true, `get the sharp with ${screenshotFilePath}`);
                    fs.unlinkSync(screenshotFileTempPath);
                    if (callback) callback(result.status);
                });
            });

        });
    });
};