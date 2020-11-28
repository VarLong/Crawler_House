## Crawler
==========

### Introduce
Crawler is a tool to crawler data form internet, it based on webdriver, selenium and crawler framework.

### Prerequisites
- Node.js
- nightwatch.js
- Selenium && webdriver

### Install and Build
npm install

npm install --global gulp-cli

gulp

## How To Run Crawler

1. Run cases with NightWatch.js (npm run test)
---------------------------------

Use 'nightwatch' command directly for local debugging purpose. All `nightwatch` commands are supported, as well as some customized commands. You can run `nightwatch` directly using `npm test`. Pass `nightwatch` command line parameters after `--`.

*Don't forget the double dashes if you intend to pass additional parameters via `npm test`.*

Example:
``
    // Show nightwatch command line help
    npm test -- --help

    // Run All case wilt tag
    npm test -- --tag ci --tag ofunk

    // Run All case wilt  deployment and device
    npm test -- --env sina-localchrome --tag ofunk

    // Run Single case
    node ./node_modules/nightwatch/bin/runner.js --test artifacts\\build\\tests\\Crowler\\Sina.js --env sina-localchrome
    npm test -- --test artifacts\\build\\tests\\Crowler\\Sina.js --env sina-localchrome --tag sina

    // Run without cases --excludeCases
    // Exclude test cases to run. Multiple test cases can be specified using full name, separated by ',':
    npm test -- --test artifacts\\build\\tests\\Crowler\\Sina.js --env sina-localchrome --excludedCases FeedbackDialog,SearchRentPlayTVShow
``

References
----------

* [Nightwatch Guide](http://nightwatchjs.org/guide)
* [Nightwatch API](http://nightwatchjs.org/api)
* [Nightwatch Wiki](https://github.com/beatfactor/nightwatch/wiki)
* [Page Object](http://martinfowler.com/bliki/PageObject.html) article by Martin Fowler
* [Selenium PageObjects wiki](https://code.google.com/p/selenium/wiki/PageObjects)
* [Selenium DesiredCapabilities](https://code.google.com/p/selenium/wiki/DesiredCapabilities)


node temp_data/filter.js

## Common Config

"headless"



