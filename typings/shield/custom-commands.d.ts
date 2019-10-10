///<reference path="../nightwatch/nightwatch.d.ts"/>

import { NightWatchBrowser, CallbackResult } from "../nightwatch/nightwatch";

export interface NightWatchCustomCommands {
    /**
     * Mouse Down on Element
     *
     * This is a function to trigger mousedown on element. it is work around for mouseButtonDown method for firefox.
     *
     * @param button It is the button to press, e.g. left
     * @param selector It is string value for selector
     * @param selectorType It is string value for selectortype, e.g. css
     * @param clientXArg it is x argument of client
     * @param clientYArg it is y argument of client
     * @param callback callback function
     */
    mouseDownOnElement: (button: string, selector: string, selectorType: string, clientXArg: number, clientYArg: number, callback?: (...args: any[]) => void) => NightWatchBrowser;

    /**
     * Mouse Move on Element
     *
     * This is a function to move to element. it is work around for moveToElement method for firefox.
     *
     * @param selector It is string value for selector
     * @param selectorType It is string value for selectortype, e.g. css
     * @param clientXArg it is x argument of client
     * @param clientYArg it is y argument of client
     * @param callback callback function
     */
    mouseMoveOnElement: (selector: string, selectorType: string, clientXArg: number, clientYArg: number, callback?: (...args: any[]) => void) => NightWatchBrowser;

    /**
     * Mouse over on Element
     *
     * This is a function to mouse move over element.
     *
     * @param selector It is string value for selector
     * @param selectorType It is string value for selectortype, e.g. css
     * @param screenXArg it is x argument of screen
     * @param screenYArg it is y argument of screen
     * @param callback callback function
     */
    mouseOverOnElement: (selector: string, selectorType: string, screenXArg: number, screenYArg: number, callback?: (...args: any[]) => void) => NightWatchBrowser;

    /**
     * Mouse Up on Element
     *
     * This is a function to trigger mouseup on element. it is work around for mouseButtonUp method for firefox.
     *
     * @param button It is the button to press, e.g. left
     * @param selector It is string value for selector
     * @param selectorType It is string value for selectortype, e.g. css
     * @param clientXArg it is x argument of client
     * @param clientYArg it is y argument of client
     * @param callback callback function
     */
    mouseUpOnElement: (button: string, selector: string, selectorType: string, clientXArg: number, clientYArg: number, callback?: (...args: any[]) => void) => NightWatchBrowser;

    /**
     * Press Remote Button
     * 
     * This is a function to press the specified remote button.
     *
     * @param button it is string value for remote button to be pressed, e.g. up and and down keys
     * @param pauseTimesMs it is number value for the pause time
     * @param timesToMove how many times to repeat for the press button action. 
     * @param message it is string value for log printing after button pressed.
     * @param callback do callback after key press complete 
     */
    pressRemoteButton: (button: string, pauseTimesMs?: number, timesToMove?: number, message?: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Screen Keyboard Input
     *
     * This is a function to do input using on screen keyboard.
     *
     * @param inputString it is string value for input
     * @param isNumKeyboard flag whether to use OnScreen numerical keyboard for PIN entry
     * @param callback do callback after input complete 
     */
    screenKeyboardInput: (inputString: string, isNumKeyboard?: boolean, callback?: () => void) => NightWatchBrowser;

    /**
     * Resize InnerWindow
     *
     * This is a function to resize innerWindow.
     *
     * @param width the width of browser innerWindow width.
     * @param height the width of browser innerWindow height.
     */
    resizeInnerWindow: (width: number, height: number) => NightWatchBrowser;

    /**
     * Trigger tap
     * 
     * This is a custom Nightwatch command to trigger tap to a selector
     *
     * @param selector It is string value for selector
     * @param selectorType It is string value for selectortype, e.g. css
     * @param callback callback function
     */
    triggerTap: (selector: string, selectorType: string, callback?: (...args: any[]) => void) => NightWatchBrowser;

    /**
     * Wait and click
     * 
     * This is a custom Nightwatch command to trigger tap to a selector
     *
     * @param selector It is string value for selector
     * @param callback callback function
     * @param waitTime It is time to wait for element to be visible before clicking. Default is 1000
     */
    waitAndClick: (selector: string, waitTime: number, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
    *  Keep The Sauce Labs Alive For A Timeout Value.
    *  function to keep the sauce labs watchdog alive.
    * @param ms <b>ms</b>[required] The required time in milliseconds for which the browser has to be kept alive.
    * @returns {NightWatchBrowser}
    * @details <br/>
    * 1. Use it like browser.keepAlive((4.5 + 0.66) * 60 * 1000), if the timeout required is 4 minutes by taking extra .5 minutes to be safe margin.
    */
    keepAlive: (ms: number) => NightWatchBrowser;

    /**
     * Compare the screenshot by css selector.
     * @param cssSelector: Css selector of the screenshot that need to be compared.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    compareImage: (cssSelector: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Create a screenshot by css sclector, and save it in the path.
     * @param cssSelector: Css selector of the screenshot that need to be compared.
     * @param path: The path that the screenshot will be saved.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    screenshotByElement: (cssSelector: string, path: string, callback?: () => void) => NightWatchBrowser;
}
