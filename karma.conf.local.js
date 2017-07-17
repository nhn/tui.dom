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
