
console.log('start globalModules.js');
const test_settings = require("./test_settings");

module.exports = {
  // this controls whether to abort the test execution when an assertion failed and skip the rest
  // it's being used in waitFor commands and expect assertions
  abortOnAssertionFailure: true,

  // this will overwrite the default polling interval (currently 500ms) for waitFor commands
  // and expect assertions that use retry
  waitForConditionPollInterval: 500,

  // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
  // expect assertions
  waitForConditionTimeout: 5000,

  // this will cause waitFor commands on elements to throw an error if multiple
  // elements are found using the given locate strategy and selector
  throwOnMultipleElementsReturned: false,

  // controls the timeout value for async hooks. Expects the done() callback to be invoked within this time
  // or an error is thrown
  asyncHookTimeout: 10000,

  // controls the timeout value for when running async unit tests. Expects the done() callback to be invoked within this time
  // or an error is thrown
  unitTestsTimeout: 2000,

  // controls the timeout value for when executing the global async reporter. Expects the done() callback to be invoked within this time
  // or an error is thrown
  customReporterCallbackTimeout: 20000,

  // Automatically retrying failed assertions - You can tell Nightwatch to automatically retry failed assertions until a given timeout is reached, before the test runner gives up and fails the test.
  retryAssertionTimeout: 1000,

  'test_settings': test_settings,

  before(cb) {
    var browser = this;
    cb();
  },

  beforeEach(browser, cb) {
    cb();
  },

  after(cb) {
    cb();
  },

  afterEach(browser, cb) {
    browser.perform(function () {
      if (browser.currentTest.results.errors > 0 || browser.currentTest.results.failed > 0) {
        var screenshotPath = "./screenshot/" + "_" + "errors" + ".png";
        browser.saveScreenshot(screenshotPath);
      }
      cb();
    });
  },

  reporter(results, cb) {
    cb();
  }
};