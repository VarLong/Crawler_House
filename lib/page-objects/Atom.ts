/// <reference path="../../typings/tsd.d.ts"/>

/**
 * base class of page objects.
 */

import { NightWatchBrowser, NightWatchClient, Assertion, Expect, CallbackResult, LogEntry, TypedCallbackResult, Keys, TestSuite } from "../../typings/nightwatch/nightwatch";
import { PageObjects } from "../../typings/shield/page-objects";

export class Atom implements NightWatchBrowser {

    api: NightWatchClient;

    assert: Assertion;

    expect: Expect;

    verify: Assertion;

    Keys: Keys;

    currentTest: TestSuite;

    globals: any;

    launch_url: string;

    device: any;

    page: PageObjects;

    /**
     * Clear a textarea or a text input element's value. Uses elementIdValue protocol command.     *
     * @param selector: The CSS/Xpath selector used to locate the element.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    clearValue: (selector: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Simulates a click event on the given DOM element. Uses elementIdClick protocol command.     *
     * @param selector: The CSS/Xpath selector used to locate the element.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    click: (selector: string, callback?: () => void) => NightWatchBrowser;

    /**
     *
     * @param callback: Close the current window. This can be useful when you're working with multiple windows open (e.g. an OAuth login).
     *                Uses window protocol command.
     * @returns {}
     */
    closeWindow: (callback?: () => void) => NightWatchBrowser;

    /**
     * Delete the cookie with the given name. This command is a no-op if there is no such cookie visible to the current page.     *
     * @param The: name of the cookie to delete.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    deleteCookie: (The: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Delete all cookies visible to the current page.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    deleteCookies: (callback?: () => void) => NightWatchBrowser;

    /**
     * Ends the session. Uses session protocol command.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    end: (callback?: () => void) => NightWatchBrowser;

    /**
     * Retrieve the value of an attribute for a given DOM element. Uses elementIdAttribute protocol command.
     * @param selector: The CSS/Xpath selector used to locate the element.
     * @param attribute: The attribute name to inspect.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {The value of the attribute}
     */
    getAttribute: (selector: string, attribute: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Retrieve a single cookie visible to the current page. The cookie is returned as a cookie JSON object, as defined here.
     * Uses cookie protocol command.
     * @param name: The cookie name
     * @param callback: The callback function which will receive the response as an argument.
     * @returns {The cookie object as a selenium cookie JSON object or null if the cookie wasn't found.}
     */
    getCookie: (name: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Retrieve all cookies visible to the current page. The cookies are returned as an array of cookie JSON object, as defined here.
     * Uses cookie protocol command.
     * @param callback: The callback function which will receive the response as an argument.
     * @returns {A list of cookies}
     */
    getCookies: (callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Retrieve the value of a css property for a given DOM element. Uses elementIdCssProperty protocol command.
     * @param selector: The CSS/Xpath selector used to locate the element.
     * @param cssProperty: The CSS property to inspect.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {The value of the css property}
     */
    getCssProperty: (selector: string, cssProperty: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Determine an element's size in pixels. Uses elementIdSize protocol command.
     * @param selector: The CSS/Xpath selector used to locate the element.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {The width and height of the element in pixels}
     */
    getElementSize: (selector: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Determine an element's location on the page. The point (0, 0) refers to the upper-left corner of the page.
     * The element's coordinates are returned as a JSON object with x and y properties. Uses elementIdLocation protocol command.
     * @param selector: The CSS/Xpath selector used to locate the element.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {The X and Y coordinates for the element on the page}
     */
    getLocation: (selector: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Determine an element's location on the screen once it has been scrolled into view. Uses elementIdLocationInView protocol command.
     * @param selector: The CSS/Xpath selector used to locate the element.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {The X and Y coordinates for the element on the page.}
     */
    getLocationInView: (selector: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Gets a log from selenium
     * @param typestring: Log type to request
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    getLog: (typestring: string, callback?: (log: LogEntry[]) => void) => NightWatchBrowser;

    /**
     * Gets the available log types
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    getLogTypes: (callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Query for an element's tag name. Uses elementIdName protocol command.
     * @param selector: The CSS/Xpath selector used to locate the element.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {The element's tag name, as a lowercase string.}
     */
    getTagName: (selector: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Returns the visible text for the element. Uses elementIdText protocol command.
     * @param selector: The CSS/Xpath selector used to locate the element.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {The element's visible text.}
     */
    getText: (selector: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Returns the title of the current page. Uses title protocol command.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {The page title.}
     */
    getTitle: (callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Returns a form element current value. Uses elementIdValue protocol command.
     * @param selector: The CSS/Xpath selector used to locate the element.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {The element's value.}
     */
    getValue: (selector: string, callback?: () => void) => NightWatchBrowser;

    /**
     * This command is an alias to url and also a convenience method when called without any arguments in the sense that it performs a call to .url() with passing the value of launch_url
     * field from the settings file. Uses url protocol command.
     * @param url: Url to navigate to.
     * @returns {}
     */
    init: (url?: string) => NightWatchBrowser;

    /**
     * Utility command to load an external script into the page specified by url.
     * @param scriptUrl: The script file url
     * @param id: Dom element id to be set on the script tag.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {The newly created script tag.}
     */
    injectScript: (scriptUrl: string, id?: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Utility command to test if the log type is available
     * @param typeString: Type of log to test
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    isLogAvailable: (typeString: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Determine if an element is currently displayed. Uses elementIdDisplayed protocol command.
     * @param selector: The CSS/Xpath selector used to locate the element.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    isVisible: (selector: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Maximizes the current window.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    maximizeWindow: (callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Move the mouse by an offset of the specified element. Uses moveTo protocol command.
     * @param selector: The CSS/Xpath selector used to locate the element.
     * @param xoffset: X offset to move to, relative to the top-left corner of the element.
     * @param yoffset: Y offset to move to, relative to the top-left corner of the element.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    moveToElement: (selector: string, xoffset: number, yoffset: number, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Suspends the test for the given time in milliseconds. If the milliseconds argument is missing it will suspend the test indefinitely
     * @param ms: The number of milliseconds to wait.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    pause: (ms: number, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Suspends the test for the given long time more than 90 ms in milliseconds. If the milliseconds argument is missing it will do noting
     * @param ms: The number of milliseconds to wait.
     * @returns {}
     */
    pauseLongTime: (ms: number) => NightWatchBrowser;

    /**
     * A simple perform command which allows access to the "api" in a callback. Can be useful if you want to read variables set by other commands.
     * @param callback: the function to run as part of the queue; it is called with the <code>browser</code> object as the first argument and a <code>done</code> callback in case of an async operation.
     * @returns {}
     */
    perform: (callback: (browser: NightWatchBrowser, done?: () => void) => void) => NightWatchBrowser;

    /**
     * Resizes the current window.
     * @param width: The new window width.
     * @param height: The new window height.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    resizeWindow: (width: number, height: number, callback?: () => void) => NightWatchBrowser;

    /**
     * Take a screenshot of the current page and saves it as the given filename.
     * @param fileName: The complete path to the file name where the screenshot should be saved.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    saveScreenshot: (fileName: string, callback?: () => void) => NightWatchBrowser;

    /**
     * SessionId of the session used by the Nightwatch api.
     */
    sessionId: string;

    /**
     * Override the sessionId used by Nightwatch client with another session id.
     * @param sessionId: The session Id to set.
     * @returns {}
     */
    setSessionId: (sessionId: string) => NightWatchBrowser;

    /**
     * Set a cookie, specified as a cookie JSON object, as defined https://code.google.com/p/selenium/wiki/JsonWireProtocol#Cookie_JSON_Object.
     * Uses cookie protocol command.
     * @param cookie: The cookie object.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    setCookie: (cookie: any, callback?: () => void) => NightWatchBrowser;

    /**
     * Sends some text to an element. Can be used to set the value of a form element or to send a sequence of key strokes to an element. Any UTF-8 character may be specified.
     * An object map with available keys and their respective UTF-8 characters, as defined on W3C WebDriver draft spec (http://www.w3.org/TR/webdriver/#character-types), is loaded onto the main Nightwatch instance as client.Keys.
     * @param selector: The CSS/Xpath selector used to locate the element.
     * @param value: The text to send to the element or key strokes.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    setValue: (selector: string, value: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Submit a FORM element. The submit command may also be applied to any element that is a descendant of a FORM element. Uses submit protocol command.
     * @param selector: The CSS/Xpath selector used to locate the element.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    submitForm: (selector: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Change focus to another window. The window to change focus to may be specified by its server assigned window handle, or by the value of its name attribute.
     * To find out the window handle use window_handles protocol action
     * @param handleOrName: The server assigned window handle or the name attribute.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    switchWindow: (handleOrName: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Convenience method that adds the specified hash (i.e. url fragment) to the current value of the launch_url as set in nightwatch.json.
     * @param hash: The hash to add/replace to the current url (i.e. the value set in the launch_url property in nightwatch.json).
     * @param callback:
     * @returns {}
     */
    urlHash: (hash: string) => NightWatchBrowser;

    /**
     * Opposite of waitForElementPresent. Waits a given time in milliseconds for an element to be not present (i.e. removed) in the page before performing any other commands or assertions.
     * If the element is still present after the specified amount of time, the test fails. You can change the polling interval by defining a waitForConditionPollInterval property (in milliseconds) in as a global property in your nightwatch.json or in your external globals file.
     * Similarly, a default timeout can be specified as a global waitForConditionTimeout property (in milliseconds).
     * @param selector: The selector (CSS / Xpath) used to locate the element.
     * @param time: The number of milliseconds to wait. The runner performs repeated checks every 500 ms.
     * @param abortOnFailure: By the default if the element is not found the test will fail. Set this to false if you wish for the test to continue even if the assertion fails. To set this globally you can define a property `abortOnAssertionFailure` in your globals.
     * @param callback: Optional callback function to be called when the command finishes.
     * @param message: Optional message to be shown in the output; the message supports two placeholders: %s for current selector and %d for the time (e.g. Element %s was not in the page for %d ms).
     * @returns {}
     */
    waitForElementNotPresent: (selector: string, time?: number, abortOnFailure?: boolean, callback?: () => void, message?: string) => NightWatchBrowser;

    /**
     * Opposite of waitForElementVisible. Waits a given time in milliseconds for an element to be not visible (i.e. hidden but existing) in the page before performing any other commands or assertions.
     * If the element fails to be hidden in the specified amount of time, the test fails. You can change the polling interval by defining a waitForConditionPollInterval property (in milliseconds) in as a global property in your nightwatch.json or in your external globals file.
     * Similarly, a default timeout can be specified as a global waitForConditionTimeout property (in milliseconds).
     * @param selector: The selector (CSS / Xpath) used to locate the element.
     * @param time: The number of milliseconds to wait. The runner performs repeated checks every 500 ms.
     * @param abortOnFailure: By the default if the element is not found the test will fail. Set this to false if you wish for the test to continue even if the assertion fails. To set this globally you can define a property `abortOnAssertionFailure` in your globals.
     * @param callback: Optional callback function to be called when the command finishes.
     * @param message: Optional message to be shown in the output; the message supports two placeholders: %s for current selector and %d for the time (e.g. Element %s was not in the page for %d ms).
     * @returns {}
     */
    waitForElementNotVisible: (selector: string, time?: number, abortOnFailure?: boolean, callback?: () => void, message?: string) => NightWatchBrowser;

    /**
     * Waits a given time in milliseconds for an element to be present in the page before performing any other commands or assertions.
     * If the element fails to be present in the specified amount of time, the test fails. You can change this by setting abortOnFailure to false.
     * You can change the polling interval by defining a waitForConditionPollInterval property (in milliseconds) in as a global property in your nightwatch.json or in your external globals file.
     * Similarly, a default timeout can be specified as a global waitForConditionTimeout property (in milliseconds).
     * @param selector: The selector (CSS / Xpath) used to locate the element.
     * @param time: The number of milliseconds to wait. The runner performs repeated checks every 500 ms.
     * @param abortOnFailure: By the default if the element is not found the test will fail. Set this to false if you wish for the test to continue even if the assertion fails. To set this globally you can define a property `abortOnAssertionFailure` in your globals.
     * @param callback: Optional callback function to be called when the command finishes.
     * @param message: Optional message to be shown in the output; the message supports two placeholders: %s for current selector and %d for the time (e.g. Element %s was not in the page for %d ms).
     * @returns {}
     */
    waitForElementPresent: (selector: string, time?: number, abortOnFailure?: boolean, callback?: () => void, message?: string) => NightWatchBrowser;

    /**
     * Waits a given time in milliseconds for an element to be visible in the page before performing any other commands or assertions.
     * If the element fails to be present and visible in the specified amount of time, the test fails. You can change this by setting abortOnFailure to false.
     * You can change the polling interval by defining a waitForConditionPollInterval property (in milliseconds) in as a global property in your nightwatch.json or in your external globals file.
     * Similarly, a default timeout can be specified as a global waitForConditionTimeout property (in milliseconds).
     * @param selector: The selector (CSS / Xpath) used to locate the element.
     * @param time: The number of milliseconds to wait. The runner performs repeated checks every 500 ms.
     * @param abortOnFailure: By the default if the element is not found the test will fail. Set this to false if you wish for the test to continue even if the assertion fails. To set this globally you can define a property `abortOnAssertionFailure` in your globals.
     * @param callback: Optional callback function to be called when the command finishes.
     * @param message: Optional message to be shown in the output; the message supports two placeholders: %s for current selector and %d for the time (e.g. Element %s was not in the page for %d ms).
     * @returns {}
     */
    waitForElementVisible: (selector: string, time?: number, abortOnFailure?: boolean, callback?: () => void, message?: string) => NightWatchBrowser;

    /**
     * Accepts the currently displayed alert dialog. Usually, this is equivalent to clicking on the 'OK' button in the dialog.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    acceptAlert: (callback?: () => void) => NightWatchBrowser;

    /**
     * Navigate backwards in the browser history, if possible.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    back: (callback?: () => void) => NightWatchBrowser;

    /**
     * Get a list of the available contexts.
     * Used by Appium when testing hybrid mobile web apps. More info here: https://github.com/appium/appium/blob/master/docs/en/advanced-concepts/hybrid.md.
     * @param callback: Callback function to be called when the command finishes.
     * @returns {an array of strings representing available contexts, e.g 'WEBVIEW', or 'NATIVE'}
     */
    contexts: (callback?: () => void) => NightWatchBrowser;

    /**
     * Retrieve or delete all cookies visible to the current page or set a cookie.
     * @param method
     * @param callbackorCookie
     * @returns {a string representing the current context or `null`, representing "no context"}
     */
    cookie: (method: string, callbackorCookie?: () => void) => NightWatchBrowser;

    /**
     * Get current context.
     * @param callback: Callback function to be called when the command finishes.
     * @returns {}
     */
    currentContext: (callback?: () => void) => NightWatchBrowser;

    /**
     * Dismisses the currently displayed alert dialog. For confirm() and prompt() dialogs, this is equivalent to clicking the 'Cancel' button.
     * For alert() dialogs, this is equivalent to clicking the 'OK' button.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    dismissAlert: (callback?: () => void) => NightWatchBrowser;

    /**
     * Double-clicks at the current mouse coordinates (set by moveto).
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    doubleClick: (callback?: () => void) => NightWatchBrowser;

    /**
     * Search for an element on the page, starting from the document root. The located element will be returned as a WebElement JSON object.
     * @param using: The locator's strategy to use.
     * @param value: The search target.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    element: (using: string, value: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Get the element on the page that currently has focus.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    elementActive: (callback?: () => void) => NightWatchBrowser;

    /**
     * Get the value of an element's attribute.
     * @param id: ID of the element to route the command to.
     * @param attributeName: The attribute name
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    elementIdAttribute: (id: string, attributeName: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Clear a TEXTAREA or text INPUT element's value.
     * @param id: ID of the element to route the command to.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    elementIdClear: (id: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Click on an element.
     * @param id: ID of the element to route the command to.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    elementIdClick: (id: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Query the value of an element's computed CSS property.
     * The CSS property to query should be specified using the CSS property name, not the JavaScript property name (e.g. background-color instead of backgroundColor).
     * @param id
     * @param cssPropertyName
     * @param callback
     * @returns {}
     */
    elementIdCssProperty: (id: string, cssPropertyName: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Determine if an element is currently displayed.
     * @param id: ID of the element to route the command to.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    elementIdDisplayed: (id: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Search for an element on the page, starting from the identified element. The located element will be returned as a WebElement JSON object.
     * @param id: ID of the element to route the command to.
     * @param using: The locator strategy to use.
     * @param value: The search target.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    elementIdElement: (id: string, using: string, value: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Search for multiple elements on the page, starting from the identified element. The located element will be returned as a WebElement JSON objects.
     * @param id: ID of the element to route the command to.
     * @param using: The locator strategy to use.
     * @param value: The search target.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    elementIdElements: (id: string, using: string, value: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Determine if an element is currently enabled.
     * @param id: ID of the element to route the command to.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    elementIdEnabled: (id: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Test if two element IDs refer to the same DOM element.
     * @param id: ID of the element to route the command to.
     * @param otherId: ID of the element to compare against.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    elementIdEquals: (id: string, otherId: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Determine an element's location on the page. The point (0, 0) refers to the upper-left corner of the page.
     * The element's coordinates are returned as a JSON object with x and y properties.
     * @param id: ID of the element to route the command to.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {The X and Y coordinates for the element on the page.}
     */
    elementIdLocation: (id: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Determine an element's location on the screen once it has been scrolled into view.
     * @param id: ID of the element to route the command to.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    elementIdLocationInView: (id: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Query for an element's tag name.
     * @param id: ID of the element to route the command to.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    elementIdName: (id: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Determine if an OPTION element, or an INPUT element of type checkbox or radio button is currently selected.
     * @param id: ID of the element to route the command to.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    elementIdSelected: (id: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Determine an element's size in pixels. The size will be returned as a JSON object with width and height properties.
     * @param id: ID of the element to route the command to.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    elementIdSize: (id: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Returns the visible text for the element.
     * @param id: ID of the element to route the command to.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    elementIdText: (id: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Send a sequence of key strokes to an element or returns the current value of the element.
     * @param id: ID of the element to route the command to.
     * @param value: Value to send to element in case of POST
     * @param callback
     * @returns {}
     */
    elementIdValue: (id: string, value?: string, callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Search for multiple elements on the page, starting from the document root. The located elements will be returned as a WebElement JSON objects.
     * Valid strings to use as locator strategies are: "class name", "css selector", "id", "name", "link text", "partial link text", "tag name", "xpath"
     * @param using: The locator strategy to use.
     * @param value: The search target.
     * @param callback: Callback function to be invoked with the result when the command finishes.
     * @returns {}
     */
    elements: (using: string, value: string, callback: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Inject a snippet of JavaScript into the page for execution in the context of the currently selected frame. The executed script is assumed to be synchronous and the result of evaluating the script is returned to the client.
     * The script argument defines the script to execute in the form of a function body. The value returned by that function will be returned to the client.
     * The function will be invoked with the provided args array and the values may be accessed via the arguments object in the order specified.
     * @param body: The function body to be injected.
     * @param args: An array of arguments which will be passed to the function.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {The script result.}
     */
    execute: (body: ((...data: any[]) => void) | string, args?: any[], callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Inject a snippet of JavaScript into the page for execution in the context of the currently selected frame. The executed script is assumed to be asynchronous and the result of evaluating the script is returned to the client.
     * Asynchronous script commands may not span page loads. If an unload event is fired while waiting for a script result, an error should be returned to the client.
     * @param script: The function body to be injected.
     * @param args: An array of arguments which will be passed to the function.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {The script result.}
     */
    executeAsync: (script: ((...data: any[]) => void) | string, args?: any[], callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Navigate forwards in the browser history, if possible.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    forward: (callback?: () => void) => NightWatchBrowser;

    /**
     * Change focus to another frame on the page. If the frame id is missing or null, the server should switch to the page's default content.
     * @param frameId: Identifier for the frame to change focus to.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    frame: (frameId?: string | Object, callback?: () => void) => NightWatchBrowser;

    /**
     * Change focus to the parent context. If the current context is the top level browsing context, the context remains unchanged.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    frameParent: (callback?: () => void) => NightWatchBrowser;

    /**
     * Gets the text of the currently displayed JavaScript alert(), confirm(), or prompt() dialog.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {The text of the currently displayed alert.}
     */
    getAlertText: (callback?: () => void) => NightWatchBrowser;

    /**
     * Get the current browser orientation.
     * @param callback: Callback function to be called when the command finishes.
     * @returns {The current browser orientation: LANDSCAPE|PORTRAIT}
     */
    getOrientation: (callback?: () => void) => NightWatchBrowser;

    /**
     * Send a sequence of key strokes to the active element. The sequence is defined in the same format as the sendKeys command.
     * An object map with available keys and their respective UTF-8 characters, as defined on W3C WebDriver draft spec, is loaded onto the main Nightwatch instance as client.Keys.
     * Rather than the setValue, the modifiers are not released at the end of the call. The state of the modifier keys is kept between calls, so mouse interactions can be performed while modifier keys are depressed.
     * @param keysToSend: The keys sequence to be sent.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    keys: (keysToSend: string[], callback?: () => void) => NightWatchBrowser;

    /**
     * Click at the current mouse coordinates (set by moveto).
     * The button can be (0, 1, 2) or ('left', 'middle', 'right'). It defaults to left mouse button, and if you don't pass in a button but do pass in a callback, it will handle it correctly.
     * @param button: The mouse button
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    mouseButtonClick: (button: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Click and hold the left mouse button (at the coordinates set by the last moveto command). Note that the next mouse-related command that should follow is mouseButtonUp . Any other mouse command (such as click or another call to buttondown) will yield undefined behaviour.
     * Can be used for implementing drag-and-drop. The button can be (0, 1, 2) or ('left', 'middle', 'right'). It defaults to left mouse button, and if you don't pass in a button but do pass in a callback, it will handle it correctly.
     * @param button: The mouse button
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    mouseButtonDown: (button: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Releases the mouse button previously held (where the mouse is currently at). Must be called once for every mouseButtonDown command issued.
     * Can be used for implementing drag-and-drop. The button can be (0, 1, 2) or ('left', 'middle', 'right'). It defaults to left mouse button, and if you don't pass in a button but do pass in a callback, it will handle it correctly.
     * @param button: The mouse button
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    mouseButtonUp: (button: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Move the mouse by an offset of the specificed element. If no element is specified, the move is relative to the current mouse cursor. If an element is provided but no offset, the mouse will be moved to the center of the element.
     * If the element is not visible, it will be scrolled into view.
     * @param element: Opaque ID assigned to the element to move to. If not specified or is null, the offset is relative to current position of the mouse.
     * @param xofset: X offset to move to, relative to the top-left corner of the element. If not specified, the mouse will move to the middle of the element.
     * @param yoffset: Y offset to move to, relative to the top-left corner of the element. If not specified, the mouse will move to the middle of the element.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    moveTo: (element: string, xofset: number, yoffset: number, callback?: () => void) => NightWatchBrowser;

    /**
     * Refresh the current page.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    refresh: (callback?: () => void) => NightWatchBrowser;

    /**
     * Take a screenshot of the current page.
     * @param log_screenshot_data: Whether or not the screenshot data should appear in the logs when running with --verbose
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    screenshot: (log_screenshot_data: boolean, callback?: () => void) => NightWatchBrowser;

    /**
     * Get info about, delete or create a new session. Defaults to the current session.
     * @param action: The http verb to use, can be "get", "post" or "delete". If only the callback is passed, get is assumed as default.
     * @param sessionId: The id of the session to get info about or delete.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    session: (action?: string, sessionId?: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Gets the text of the log type specified
     * @param typeString: Type of log to request
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {Array of the text entries of the log.}
     */
    sessionLog: (typeString: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Gets an array of strings for which log types are available.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {Available log types}
     */
    sessionLogTypes: (callback?: () => void) => NightWatchBrowser;

    /**
     * Returns a list of the currently active sessions.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    sessions: (callback?: () => void) => NightWatchBrowser;

    /**
     * Keeps sessions info. Used for multi device and companion tests
     */
    sessionsInfo: any[];

    /**
     * Sends keystrokes to a JavaScript prompt() dialog.
     * @param value: Keystrokes to send to the prompt() dialog
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    setAlertText: (value: string, callback?: () => void) => NightWatchBrowser;
    /**
     * Sets the context
     * @param context: context name to switch to - a string representing an available context.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    setContext: (context: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Sets the browser orientation.
     * @param orientation: The new browser orientation: {LANDSCAPE|PORTRAIT}
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    setOrientation: (orientation: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Get the current page source.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    source: (callback?: () => void) => NightWatchBrowser;

    /**
     * Query the server's current status.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    status: (callback?: () => void) => NightWatchBrowser;

    /**
     * Submit a FORM element. The submit command may also be applied to any element that is a descendant of a FORM element.
     * @param id: ID of the element to route the command to.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    submit: (id: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Configure the amount of time that a particular type of operation can execute for before they are aborted and a |Timeout| error is returned to the client.
     * @param typeOfOperation: The type of operation to set the timeout for. Valid values are: "script" for script timeouts, "implicit" for modifying the implicit wait timeout and "page load" for setting a page load timeout.
     * @param ms: The amount of time, in milliseconds, that time-limited commands are permitted to run.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    timeouts: (typeOfOperation: string, ms: number, callback?: () => void) => NightWatchBrowser;

    /**
     * Set the amount of time, in milliseconds, that asynchronous scripts executed by /session/:sessionId/execute_async are permitted to run before they are aborted and a |Timeout| error is returned to the client.
     * @param ms: The amount of time, in milliseconds, that time-limited commands are permitted to run.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    timeoutsAsyncScript: (ms: number, callback?: () => void) => NightWatchBrowser;

    /**
     * Set the amount of time the driver should wait when searching for elements. If this command is never sent, the driver will default to an implicit wait of 0ms.
     * @param ms: The amount of time, in milliseconds, that time-limited commands are permitted to run.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    timeoutsImplicitWait: (ms: number, callback?: () => void) => NightWatchBrowser;

    /**
     * Get the current page title.
     * @param expected: The expected page title.
     * @param msg: Optional log message to display in the output. If missing, one is displayed by default.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    title: (expected: string, msg?: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Retrieve the URL of the current page or navigate to a new URL.
     * @param url: If missing, it will return the URL of the current page as an argument to the supplied callback
     * @param callback Optional callback function to be called when the command finishes.
     * @returns {}
     */
    url: (url?: string | ((result: CallbackResult) => void), callback?: (result: CallbackResult) => void) => NightWatchBrowser;

    /**
     * Change focus to another window or close the current window.
     * @param method: The HTTP method to use
     * @param handleOrName: The window to change focus to.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    window: (method: string, handleOrName: string, callback?: () => void) => NightWatchBrowser;

    /**
     * Retrieve the current window handle.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    windowHandle: (callback?: () => void) => NightWatchBrowser;

    /**
     * Retrieve the list of all window handles available to the session.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    windowHandles: (callback?: (result: TypedCallbackResult<string[]>) => void) => NightWatchBrowser;

    /**
     * Retrieve the current window handle.
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    windowMaximize: (callback?: () => void) => NightWatchBrowser;

    /**
     * Change or get the size of the specified window. If the second argument is a function it will be used as a callback and the call will perform a get request to retrieve the existing window size.
     * @param windowHandle:
     * @param width:
     * @param height:
     * @param callback: Optional callback function to be called when the command finishes.
     * @returns {}
     */
    windowSize: (windowHandle: string, width: number, height: number, callback?: () => void) => NightWatchBrowser;

    /**
     * To switch to xpath selectors instead of css as the locate strategy.
     * To always use xpath by default set the property "use_xpath": true in your test settings.
     * @returns {}
     */
    useXpath: () => NightWatchBrowser;

    /**
     * To switch to css selectors instead of xpath as the locate strategy
     * @returns {}
     */
    useCss: () => NightWatchBrowser;

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

    /**
     * Local storage clear
     *
     * This is a function to Clear of local storage
     */
    localStorageClear: () => NightWatchBrowser;

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
     *  Keep The Broser Labs Alive For A Timeout Value.
     *  function to keep the browser labs watchdog alive.
     * @param ms <b>ms</b>[required] The required time in milliseconds for which the browser has to be kept alive.
     * @returns {NightWatchBrowser}
     * @details <br/>
     * 1. Use it like browser.keepAlive((4.5 + 0.66) * 60 * 1000), if the timeout required is 4 minutes by taking extra .5 minutes to be safe margin.
     */
    keepAlive: (ms: number) => NightWatchBrowser;

    /**
     * Get element attribute
     *
     * This is a custom Nightwatch command to get an element attribute by jquery
     *
     * @param selector It is string value for selector
     * @param attributeName Element attribute name
     * @param callback callback function
     *
     */
    getElementAttribute: (selector: string, attributeName: string, callback: (value: any) => void) => void;
}