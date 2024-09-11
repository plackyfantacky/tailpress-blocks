const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
    ...defaultConfig,
    ...{
        entry: {
            ...defaultConfig.entry(),
            code: {import: './src/code/code.js', filename: 'code/[name].js'},
        }
    }
};
