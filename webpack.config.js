var webpack = require('webpack');
var isProduction = process.env.NODE_ENV === 'production';
var pkg = require('./package.json');

var banner = [
    ' ' + pkg.name,
    ' @author ' + pkg.author,
    ' @version v' + pkg.version,
    ' @license ' + pkg.license
].join('\n');

var config = {
    entry: './src/index.js',
    output: {
        path: 'dist',
        filename: pkg.name + '.js'
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
    plugins: [
        new webpack.BannerPlugin(banner)
    ]
};

if (isProduction) {
    config.output.filename = pkg.name + '.min.js';

    const uglifyJS = new webpack.optimize.UglifyJsPlugin({
        compress: {
            'drop_console': true,
            warnings: false
        }
    });

    config.plugins.push(uglifyJS);
}

module.exports = config;
