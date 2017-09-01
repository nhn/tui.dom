/**
 * Configs file for bundling
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */

const pkg = require('./package.json');
const webpack = require('webpack');

const SafeUmdPlugin = require('safe-umd-webpack-plugin');
const uglifyJS = new webpack.optimize.UglifyJsPlugin({
    compress: {
        'drop_console': true,
        warnings: false
    },
    'screw_ie8': false,
    'support_ie8': true,
    mangle: true,
    output: {comments: false}
});

const isProduction = process.argv.indexOf('-p') > -1;

const FILENAME = pkg.name + (isProduction ? '.min.js' : '.js');
const BANNER = [
    FILENAME,
    `@version ${pkg.version}`,
    `@author ${pkg.author}`,
    `@license ${pkg.license}`
].join('\n');

const config = {
    eslint: {
        failOnError: isProduction
    },
    entry: './src/js/index.js',
    output: {
        library: ['tui', 'dom'],
        libraryTarget: 'umd',
        path: 'dist',
        publicPath: 'dist',
        filename: FILENAME
    },
    externals: {
        'tui-code-snippet': {
            'commonjs': 'tui-code-snippet',
            'commonjs2': 'tui-code-snippet',
            'amd': 'tui-code-snippet',
            'root': ['tui', 'util']
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /(test|node_modules|bower_components)/,
                loader: 'eslint-loader'
            }
        ],
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }]
    },
    plugins: [
        new SafeUmdPlugin(),
        new webpack.BannerPlugin(BANNER)
    ],
    devServer: {
        historyApiFallback: false,
        progress: true,
        host: '0.0.0.0',
        disableHostCheck: true
    }
};

if (isProduction) {
    config.plugins.push(uglifyJS);
}

module.exports = config;
