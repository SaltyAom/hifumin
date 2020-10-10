const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: ['./src/**/*'],
	theme: {
		extend: {},
		colors: {
			...colors,
			primary: {
				default: "#007aff"
			}
		}
	},
	variants: {},
	plugins: [],
}
