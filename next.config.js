const { join } = require('path')

const withOffline = require('next-offline')
const withAnalyze = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})
const withPlugins = require('next-compose-plugins')

const withStyles = require('./tools/withStyles')
const withEsbuild = require('./tools/withEsbuild')
const withPreact = require('./tools/withPreact')
const offlineConfig = require('./tools/withOffline')

module.exports = withPlugins(
	[
		[withStyles],
		[withEsbuild],
		[withPreact],
		[withOffline, offlineConfig],
		[withAnalyze]
	],
	{
		async rewrites() {
			return [
				{
					source: '/service-worker.js',
					destination: '/_next/static/service-worker.js'
				}
			]
		},
		experimental: {
			modern: true,
			polyfillsOptimization: true
			// optimizeCss: true
		},
		images: {
			domains: ['i.nhentai.net', 't.nhentai.net'],
			deviceSizes: [360, 568, 760],
			imageSizes: [16, 32, 48, 64, 96],
			path: '/_next/image',
			loader: 'default'
		},
		webpack(config) {
			config.resolve.alias = {
				...config.resolve.alias,
				'@pages': join(__dirname, 'src/pages'),
				'@layouts': join(__dirname, 'src/layouts'),
				'@components': join(__dirname, 'src/components'),
				'@styles': join(__dirname, 'src/styles'),
				'@services': join(__dirname, 'src/services'),
				'@models': join(__dirname, 'src/models'),
				'@stores': join(__dirname, 'src/stores'),
				'@tailwind': join(__dirname, 'src/services/tailwind/index.ts'),
				'@atoms': join(__dirname, 'src/components/atoms'),
				'@molecules': join(__dirname, 'src/components/molecules'),
				'@organisms': join(__dirname, 'src/components/organisms')
			}

			return config
		}
	}
)
