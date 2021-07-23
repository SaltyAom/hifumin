module.exports = {
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
	},
	images: {
		domains: ['i.nhentai.net', 't.nhentai.net'],
		deviceSizes: [360, 568, 760],
		imageSizes: [16, 32, 48, 64, 96],
		path: '/_next/image',
		loader: 'default'
	}
}
