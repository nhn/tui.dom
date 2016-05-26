module.exports = function(config) {
    config.set({
        colors: true,
        autoWatch: true,
        singleRun: false,
        concurrency: Infinity,
        logLevel: config.LOG_INFO,
        frameworks: [
            'jasmine',
            'fixture'
        ],
        files: [
            'bower_components/tui-code-snippet/code-snippet.js',
            'domutil.js',
            'test/*.js'
        ],
        reporters: [
            'dots',
            'junit'
        ],
        junitReporter: {
            outputDir: 'reports/junit',
            suite: ''
        },
        browsers: [
            'Chrome'
        ]
    });
};
