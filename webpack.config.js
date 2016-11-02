var webpack = require('webpack');
var isProduction = process.env.NODE_ENV === 'production';

var config = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'domutil.js'
    },
    module: {
        noParse: /bower_components\/.*\/*.js/,
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }]
    },
    externals: {
        'code-snippet': 'tui.util'
    },
    plugins: []
};

if (isProduction) {
    config.output.filename = 'domutil.min.js';

    const uglifyJS = new webpack.optimize.UglifyJsPlugin({
        compress: {
            drop_console: true, warnings: false
        }
    });

    config.plugins.push(uglifyJS);
}

module.exports = config;
