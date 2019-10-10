/// <reference path='../../typings/tsd.d.ts' />

const gitHubLogInPageCommands = {
    waitForPage: function () {
        this.api.useCss().waitForElementVisible(this.elements["loginButton"].selector);
        return this;
    }
};

module.exports = {
    commands: [gitHubLogInPageCommands],
    elements: {
        loginButton: {
            selector: "#router > #ChannelSubscribePage"
        }
    }
};