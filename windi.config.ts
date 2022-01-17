import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    purge: ['./src/**/*.html', './src/**/*.svelte'],
    darkMode: 'class', // or 'media' or 'class'
    attributify: true,
    theme: {
        extend: {}
    },
    plugins: []
})
