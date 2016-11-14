module.exports = function(config) {
    config.set({
        colors: true,
        autoWatch: false,
        singleRun: true,
        concurrency: Infinity,
        logLevel: config.LOG_INFO,
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
            'junit',
            'coverage'
        ],
        specReporter: {
            suppressSkipped: true,
            suppressPassed: true
        },
        junitReporter: {
            outputDir: 'junit'
        },
        coverageReporter: {
            type: 'cobertura'
        },
        browserStack: {
            username: process.env.BROWSER_STACK_USERNAME,
            accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
            project: 'tui-dom'
        },

        // define browsers
        customLaunchers: {
            bs_ie8: {
                base: 'BrowserStack',
                os: 'Windows',
                os_version: 'XP',
                browser_version: '8.0',
                browser: 'ie'
            },
            bs_ie9: {
                base: 'BrowserStack',
                os: 'Windows',
                os_version: '7',
                browser_version: '9.0',
                browser: 'ie'
            },
            bs_ie10: {
                base: 'BrowserStack',
                os: 'Windows',
                os_version: '7',
                browser_version: '10.0',
                browser: 'ie'
            },
            bs_ie11: {
                base: 'BrowserStack',
                os: 'Windows',
                os_version: '7',
                browser_version: '11.0',
                browser: 'ie'
            },
            bs_edge: {
                base: 'BrowserStack',
                os: 'Windows',
                os_version: '10',
                browser: 'edge',
                browser_version: '12.0'
            },
            bs_chrome_mac: {
                base: 'BrowserStack',
                os: 'OS X',
                os_version: 'sierra',
                browser: 'chrome',
                browser_version: 'latest'
            },
            bs_firefox_mac: {
                base: 'BrowserStack',
                os: 'OS X',
                os_version: 'sierra',
                browser: 'firefox',
                browser_version: 'latest'
            }
        },

        browsers: [
            'bs_ie8',
            'bs_ie9',
            'bs_ie10',
            'bs_ie11',
            'bs_edge',
            'bs_chrome_mac',
            'bs_firefox_mac'
        ],

        browserNoActivityTimeout: 20000
    });
};
