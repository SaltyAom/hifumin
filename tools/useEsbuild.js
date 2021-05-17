// ? https://github.com/privatenumber/esbuild-loader-examples/

/* eslint-disable import/no-extraneous-dependencies */
const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader')

function provideReact(config) {
    let { webpack } = config

    config.plugins.push(
        new webpack.ProvidePlugin({
            React: 'react'
        })
    )

    return config
}

function useEsbuildMinify(config, options) {
    const terserIndex = config.optimization.minimizer.findIndex(
        (minimizer) => minimizer.constructor.name === 'TerserPlugin'
    )

    if (terserIndex > -1) {
        config.optimization.minimizer.splice(
            terserIndex,
            1,
            new ESBuildMinifyPlugin(options)
        )
    }
}

function generateLoader(extension, config) {
    const loader = config.module.rules.find(
        (rule) => rule.test && rule.test.test(`.${extension}`)
    )

    if (loader) {
        loader.use.loader = 'esbuild-loader'
        loader.use.options = {
            loader: extension,
            target: 'es2017'
        }
    }

    return config
}

function useEsbuildLoader(config) {
    provideReact(config)

    config.plugins.push(new ESBuildPlugin())

    generateLoader(['js', 'jsx', 'ts', 'tsx'])

    return config
}

module.exports = {
    useEsbuildLoader,
    useEsbuildMinify,
    provideReact
}
