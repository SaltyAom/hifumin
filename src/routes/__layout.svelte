<script lang="ts">
    import AuthProvider from '$lib/provider/authProvider.svelte'

    import AppBar from '$lib/layouts/app-bar.svelte'
    import BottomBar from '$lib/layouts/bottom-bar.svelte'
    import Nprogress from '$lib/layouts/nprogress.svelte'
    import ThemeProvider from '$lib/providers/theme.svelte'
    import OpenGraph from '$lib/atoms/open-graph.svelte'

    import 'virtual:windi.css'
    import '../styles/global.sass'
</script>

<!-- {#if currentPath === '/h/229345'} -->
    <!-- <AuthProvider />

    <OpenGraph />

    <ThemeProvider />
    <Nprogress />
    <AppBar />
    <slot />
    <BottomBar /> -->
<!-- {:else} -->
    <main
        class="flex flex-col justify-center items-center w-full h-screen max-w-xs mx-auto gap-2"
    >
        <img
            class="w-[128px] h-[128px] object-cover object-center"
            src="/assets/images/hifumi.webp"
            alt="Hifumi"
        />
        <h1 class="text-3xl text-gray-700 dark:text-gray-400 font-medium my-2">
            Maintainance
        </h1>
        <p class="text-gray-500 dark:text-gray-500 text-center">
            We are upgrading Hifumin infra and security against DDOS attack.
        </p>
        <p class="text-gray-500 dark:text-gray-500 text-center">
            Hifumin will be available in 2 hours, thanks for your patient and
            understanding
        </p>
    </main>
<!-- {/if} -->
