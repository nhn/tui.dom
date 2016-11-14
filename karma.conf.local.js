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
        browsers: [
            'PhantomJS'
        ]
    });
};
