/**
 * Compare the screenshot by css selector. The first screenshot location is the current folder. If there is no screenshot for comparing. This command will generate a
 * screenshot for comparing. Please make sure the screenshot is correct.
 * @param cssSelector: Css selector of the screenshot which need to be compared.
 * @param callback: Optional callback function to be called when the command finishes.
 * @returns {}
 */

import { NightWatchBrowser } from "../../typings/nightwatch/nightwatch";
const fs = require("fs");
const blinkDiff = require("blink-diff");

module.exports.command = function (cssSelector: string, callback?: any) {
    const browser = <NightWatchBrowser>this;
    const screenshotAPath = `./tests/${browser.currentTest.module}`;
    const screenshotBPath = `./ShieldLog/${process.env.runId}/${browser.currentTest.module}`;
    const screenshotFileAPath = `${screenshotAPath}/${cssSelector}.png`;
    const screenshotFileBPath = `${screenshotBPath}/${cssSelector}.png`;
    if (!fs.existsSync(screenshotFileAPath)) {
        console.log("record the screenshot at the begin by selector: " + cssSelector);
        browser.screenshotByElement(cssSelector, screenshotAPath);
    }
    const diff = new blinkDiff({
        imageAPath: screenshotFileAPath,
        imageBPath: screenshotFileBPath,
        outputMaskRed: 255,
        outputMaskGreen: 0,
        outputMaskBlue: 0,
        outputMaskAlpha: 255,
        outputMaskOpacity: 0.7,
        outputShiftRed: 0,
        outputShiftGreen: 255,
        outputShiftBlue: 0,
        outputShiftAlpha: 255,
        outputShiftOpacity: 0.7,
        thresholdType: blinkDiff.THRESHOLD_PERCENT,
        threshold: 0.2, // 0.05% - helps to avoid issues with antialiasing or other minor differences
        delta: 0,
        verbose: true,
        debug: true
    });
    browser.screenshotByElement(cssSelector, screenshotBPath, () => {
        diff.run(function (error: any, result: any) {
            if (error) {
                console.log(JSON.stringify(error));
            } else {
                browser.assert.equal(diff.hasPassed(result.code), true, `The screenshot was same by selector ${cssSelector}. There are ${result.differences} differences here.`);
            }
        });
    });
    browser.pause(3000);
    if (callback) callback();
};