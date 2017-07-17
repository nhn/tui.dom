var webpack = require('webpack');
var isProduction = process.env.NODE_ENV === 'production';
var pkg = require('./package.json');

var banner = [
    ' ' + pkg.name,
    ' @author ' + pkg.author,
    ' @version v' + pkg.version,
    ' @license ' + pkg.license
].join('\n');

var SafeUmdPlugin = require('safe-umd-webpack-plugin');

var config = {
    entry: './src/index.js',
    output: {
        libraryTarget: 'umd',
        library: ['tui', 'dom'],
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
        'tui-code-snippet': {
            'commonjs': 'tui-code-snippet',
            'commonjs2': 'tui-code-snippet',
            'amd': 'tui-code-snippet',
            'root': ['tui', 'util']
        }
    },
    plugins: [
        new webpack.BannerPlugin(banner),
        new SafeUmdPlugin()
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
