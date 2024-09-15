const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
    ...defaultConfig,
    ...{
        entry: {
            ...defaultConfig.entry(),
            //custom blocks
            'inline-svg': {import: './src/blocks/inline-svg/inline-svg.js', filename: 'blocks/[name]/[name].js'},
            'link': {import: './src/blocks/link/link.js', filename: 'blocks/[name]/[name].js'},

            //core block overrides
            'code': {import: './src/core-blocks/code/code.js', filename: 'core-blocks/[name]/[name].js'},

            //plugins
            'related-posts': {import: './src/plugins/related-posts/related-posts.js', filename: 'plugins/[name]/[name].js'},
        }
    }
};
