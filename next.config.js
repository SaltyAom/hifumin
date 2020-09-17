/* eslint-disable @typescript-eslint/no-var-requires */
const withStylus = require("@zeit/next-stylus"),
	withOffline = require("next-offline")

const composePlugins = require("next-compose-plugins")

const { join } = require("path")

module.exports = composePlugins([[withStylus], [withOffline]], {
	experimental: {
		modern: true,
		polyfillsOptimization: true
	},
	target: "serverless",

	webpack(config, { dev, isServer }) {
		const splitChunks =
			config.optimization && config.optimization.splitChunks
		if (splitChunks) {
			const cacheGroups = splitChunks.cacheGroups
			const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/
			if (cacheGroups.framework) {
				cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
					test: preactModules
				})
				cacheGroups.commons.name = "framework"
			} else {
				cacheGroups.preact = {
					name: "commons",
					chunks: "all",
					test: preactModules
				}
			}
		}

		config.resolve.alias = {
			...config.resolve.alias,
			react: "preact/compat",
			"react-dom": "preact/compat",
			"react-render-to-string": "preact-render-to-stirng",
			"@pages": join(__dirname, "src/pages"),
			"@public": join(__dirname, "public"),
			"@styles": join(__dirname, "src/styles"),
			"@components": join(__dirname, "src/components"),
			"@libs": join(__dirname, "src/libs"),
			"@stores": join(__dirname, "src/stores"),
			"@layouts": join(__dirname, "src/layouts")
		}

		config.optimization = {
			...config.optimization,
			usedExports: true
		}

		if (dev && !isServer) {
			const entry = config.entry
			config.entry = () =>
				entry().then((entries) => {
					entries["main.js"] = ["preact/debug"].concat(
						entries["main.js"] || []
					)
					return entries
				})
		}

		return config
	}
})
