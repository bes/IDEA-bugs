const path = require('path');

const baseConfig = require('../lib-util/webpack-config-base.create');

const configuration = {
    srcPath: path.join(__dirname, 'src/main/js'),
    destPath: path.join(__dirname, 'build/webpack/js'),
    port: 8080,
};

module.exports = baseConfig.createConfig(configuration);
