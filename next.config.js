/* eslint-disable @typescript-eslint/no-var-requires */
const withStylus = require('@zeit/next-stylus'),
	withOffline = require('next-offline')

const composePlugins = require('next-compose-plugins')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const { join } = require('path')

const preact = require('preact')

module.exports = composePlugins(
	[
		[withStylus],
		[
			withOffline,
			{
				dontAutoRegisterSw: true,
				workboxOpts: {
					swDest: 'static/service-worker.js',
					runtimeCaching: [
						{
							urlPattern: /.js$|.css$|.svg$|.jpg$|.png$|.otf$/,
							handler: 'CacheFirst'
						},
						{
							urlPattern: /nhapi.now.sh\/\*/,
							handler: 'NetworkFirst',
							options: {
								cacheableResponse: {
									statuses: [0, 200]
								}
							}
						}
					]
				}
			}
		]
	],
	{
		experimental: {
			modern: true,
			polyfillsOptimization: true
		},
		images: {
			domains: ['i.nhentai.net', 't.nhentai.net'],
			deviceSizes: [640, 750, 828, 1080],
			imageSizes: [16, 32, 48, 64, 96],
			path: '/_next/image',
			loader: 'default',
		},
		target: 'serverless',

		async rewrites() {
			return [
				{
					source: '/service-worker.js',
					destination: '/_next/static/service-worker.js'
				}
			]
		},

		webpack(config, { dev, isServer }) {
			const splitChunks =
				config.optimization && config.optimization.splitChunks
			if (splitChunks) {
				const cacheGroups = splitChunks.cacheGroups
				const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/
				if (cacheGroups.framework) {
					cacheGroups.preact = Object.assign(
						{},
						cacheGroups.framework,
						{
							test: preactModules
						}
					)
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
				'react-render-to-string': 'preact-render-to-stirng',
				'@pages': join(__dirname, 'src/pages'),
				'@public': join(__dirname, 'public'),
				'@styles': join(__dirname, 'src/styles'),
				'@components': join(__dirname, 'src/components'),
				'@libs': join(__dirname, 'src/libs'),
				'@stores': join(__dirname, 'src/stores'),
				'@layouts': join(__dirname, 'src/layouts'),
				'@providers': join(__dirname, 'src/providers')
			}

			if (!dev)
				config.optimization = {
					...config.optimization,
					usedExports: true,
					minimizer: [
						...config.optimization.minimizer,
						new OptimizeCSSAssetsPlugin()
					]
				}

			if (dev) {
				if (isServer) {
					// Remove circular `__self` and `__source` props only meant for
					// development. See https://github.com/developit/nextjs-preact-demo/issues/25
					let oldVNodeHook = preact.options.vnode
					preact.options.vnode = (vnode) => {
						const props = vnode.props
						if (props != null) {
							if ('__self' in props) props.__self = null
							if ('__source' in props) props.__source = null
						}

						if (oldVNodeHook) {
							oldVNodeHook(vnode)
						}
					}
				} else {
					// inject Preact DevTools
					const entry = config.entry
					config.entry = () =>
						entry().then((entries) => {
							entries['main.js'] = ['preact/debug'].concat(
								entries['main.js'] || []
							)
							return entries
						})
				}
			}

			return config
		}
	}
)
