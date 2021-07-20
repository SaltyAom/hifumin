/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
module.exports = (nextConfig = {}) => ({
    ...nextConfig,
    webpack(config, { dev, isServer }) {
        const splitChunks =
            config.optimization && config.optimization.splitChunks

        if (splitChunks) {
            const cacheGroups = splitChunks.cacheGroups || {}
            const preactModules =
                /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/
            if (cacheGroups.framework) {
                cacheGroups.preact = {
                    ...cacheGroups.framework,
                    test: preactModules
                }
                cacheGroups.commons.name = 'framework'
            } else {
                cacheGroups.preact = {
                    name: 'commons',
                    chunks: 'all',
                    test: preactModules
                }
            }
        }

        config.resolve.alias = {
            ...config.resolve.alias,
            react: 'preact/compat',
            'react-dom': 'preact/compat',
            'react-render-to-string': 'preact-render-to-string'
        }

        // inject Preact DevTools
        if (dev && !isServer) {
            const entry = config.entry
            config.entry = () =>
                entry().then((entries) => {
                    entries['main.js'] = ['preact/debug'].concat(
                        entries['main.js'] || []
                    )
                    return entries
                })
        }

        return config
    }
})
