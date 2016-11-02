var webdriverConfig = {
    hostname: 'fe.nhnent.com',
    port: 4444,
    remoteHost: true
};

module.exports = function(config) {
    config.set({
        colors: true,
        autoWatch: false,
        singleRun: true,
        concurrency: Infinity,
        logLevel: config.LOG_INFO,
        plugins: [
            'karma-jasmine',
            'karma-fixture',
            'karma-webpack',
            'karma-coverage',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'karma-webdriver-launcher',
            'karma-spec-reporter'
        ],
        frameworks: [
            'jasmine',
            'fixture'
        ],
        files: [
            'bower_components/tui-code-snippet/code-snippet.js',
            'test/*.spec.js'
        ],
        preprocessors: {
            'test/*.spec.js': ['webpack', 'sourcemap']
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [{
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel'
                }]
            },
            externals: {
                'code-snippet': 'tui.util'
            }
        },
        webpackMiddleware: {
            noInfo: true
        },
        reporters: [
            'spec',
            'coverage'
        ],
        specReporter: {
            suppressSkipped: true,
            suppressPassed: true
        },
        coverageReporter: {
            type: 'cobertura'
        },
        browsers: [
            'IE8',
            'IE9',
            'IE10',
            'IE11',
            'Edge',
            'Chrome-WebDriver',
            'Firefox-WebDriver'
        ],
        customLaunchers: {
            'IE8': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 8
            },
            'IE9': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 9
            },
            'IE10': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 10
            },
            'IE11': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 11
            },
            'Edge': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'MicrosoftEdge'
            },
            'Chrome-WebDriver': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'chrome'
            },
            'Firefox-WebDriver': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'firefox'
            }
        }
    });
};
