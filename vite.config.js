// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite'

import WindiCSS from 'vite-plugin-windicss'
import { partytownVite } from '@builder.io/partytown/utils'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

/** @type {import('vite').UserConfig} */
const config = {
    server: {
        port: 3000
    },
    plugins: [
        sveltekit(),
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

export default config
