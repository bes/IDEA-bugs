const path = require('path');

// Dummy Webpack config for IDEA support

module.exports = {
    resolve: {
        alias: {
            'lib-util': path.join(__dirname, '../', 'lib-util/src/main/js'),
        },
    },
};
