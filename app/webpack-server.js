const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack-config.debug')({production: false, development: true});

new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
}).listen(config.devServer.devHotReloadPort, 'localhost', function resultCb(listenErr) {
    if (listenErr) {
        console.error(listenErr);
    }
    console.log('Listening at localhost:' + config.devServer.devHotReloadPort);
});
