const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const nodeModulesPath = path.join(__dirname, '../', 'node_modules');
const libUtilPath = path.resolve(__dirname, '../', 'lib-util/src/main/js');
const aliasConfig = require("./webpack.idea.js");

const devServerPort = 8080;

exports.createConfig = (config) => {
    /**
     * Parameter debug true if running from webpack-dev-server, false otherwise
     * Parameter env command line environment, supplied by webpack
     */
    return (debug) => (env) => {

        console.log(`Development: ${env.development}, Production: ${env.production}`);

        // Use babelSettings instead of .babelrc
        const babelSettings = {
            presets: [
                // Stage 2 contains import() and class properties
                // https://babeljs.io/docs/plugins/preset-stage-2/
                'babel-preset-stage-3',
                ['babel-preset-es2015', {modules: false}],
                'babel-preset-react',
            ],
            plugins: [
                'babel-plugin-transform-class-properties',
                'babel-plugin-syntax-dynamic-import',
                'react-hot-loader/babel',
            ],
            cacheDirectory: true,
        };

        let devtool = undefined;
        if (debug) {
            devtool = 'source-map';
        }

        const entry = {
            main: [
                'babel-polyfill',
                'react-hot-loader/patch',
                path.join(config.srcPath, 'main.js'),
            ],
        };

        if (debug) {
            // Enable hotloading in debug mode
            Object.keys(entry).forEach(function hot(entryKey) {
                const entryItem = entry[entryKey];
                entryItem.unshift('webpack/hot/only-dev-server'); // 'only' prevents reload on syntax errors
                entryItem.unshift('webpack-dev-server/client?http://localhost:' + config.port);
            });
        }

        const module = {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /(node_modules)/,
                    use: [{ loader: 'babel-loader', query: babelSettings }],
                },
            ],
        };

        let webpackPluginFilename;
        if (debug) {
            webpackPluginFilename = "index.html";
        } else {
            webpackPluginFilename = '../index.html';
        }

        const plugins = [];

        plugins.push(new webpack.ProvidePlugin({
            Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise', // Promise Polyfill
            fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch', // Fetch Polyfill
        }));
        plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: debug ? '"development"' : '"production"',
            },
        }));
        plugins.push(new HtmlWebpackPlugin({
            inject: true,
            template: path.join(config.srcPath, 'index.html'),
            filename: webpackPluginFilename,
        }));

        if (debug) {
            plugins.push(new webpack.HotModuleReplacementPlugin());
            plugins.push(new webpack.NamedModulesPlugin());
        } else {
            plugins.push(new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
                sourceMap: true,
            }));
        }

        return {
            target: 'web',
            cache: true,
            entry: entry,
            resolve: {
                extensions: ['.js'],
                modules: [config.srcPath, nodeModulesPath, 'src/main/js'],
                alias: aliasConfig.resolve.alias,
            },
            resolveLoader: {
                modules: [nodeModulesPath],
            },
            output: {
                path: config.destPath,
                publicPath: debug ? '/' : '/js/',
                filename: debug ? '[name].js' : '[name].[chunkhash].js',
                chunkFilename: debug ? '[name].js' : '[name].[chunkhash].js',
            },
            module: module,
            plugins: plugins,
            devtool: devtool,
            devServer: {
                devHotReloadPort: config.port,
                devServerPort: devServerPort,
            },
        };
    };
};
