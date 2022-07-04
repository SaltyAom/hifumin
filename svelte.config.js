import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'

import WindiCSS from 'vite-plugin-windicss'
import { partytownVite } from '@builder.io/partytown/utils'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

console.log(
    join(dirname(fileURLToPath(import.meta.url)), 'build/static', '~partytown')
)

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess({
        sass: true,
        preserve: ['partytown']
    }),

    target: '#svelte',

    kit: {
        adapter: adapter(),

        vite: {
            plugins: [
                WindiCSS(),
                partytownVite({
                    dest: join(
                        dirname(fileURLToPath(import.meta.url)),
                        'static',
                        '~partytown'
                    )
                })
            ]
        }
    }
}

export default config