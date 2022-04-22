import cloudflare from '@sveltejs/adapter-cloudflare'
import node from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'

import WindiCSS from 'vite-plugin-windicss'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess({
        sass: true
    }),

    target: '#svelte',

    kit: {
        adapter: process.env.LOCAL == 'true' ? node() : cloudflare(),

        vite: {
            plugins: [WindiCSS()]
        }
    }
}

export default config
