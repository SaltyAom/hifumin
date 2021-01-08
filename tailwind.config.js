const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
    purge: {
        preserveHtmlElements: false,
        content: ['src/**/*.[j|t]s[x]?']
    },
    darkMode: 'class',
    theme: {
        extend: {},
        colors: {
			...colors,
			primary: {
				DEFAULT: "#007aff",
				dark: "#00aaff"
			}
		}
    },
    variants: {
        extend: {}
    },
    plugins: []
}
