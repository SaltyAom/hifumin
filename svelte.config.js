import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'

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
        alias: {
            "@layouts": "./src/layouts",
            "@components": "./src/components",
            "@shared": "./src/components/shared",
            "@modules": "./src/components/modules",
            "@skeletons": "./src/components/skeletons",
            "@providers": "./src/components/providers",
            "@icons": "./src/components/icons",
            "@pages": "./src/pages",
            "@services": "./src/services",
            "@gql": "./src/services/gql",
            "@use": "./src/services/use",
            "@stores": "./src/stores",
            "@models": "./src/models",
            "@styles": "./src/styles",
        }
    }
}

export default config