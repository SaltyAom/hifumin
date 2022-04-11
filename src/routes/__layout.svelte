<script context="module" lang="ts">
    import { client } from '@saltyaom/gq'

    client.config('https://api.hifumin.app/v1/graphql')
</script>

<script lang="ts">
    import AppBar from '$lib/layouts/app-bar.svelte'
    import BottomBar from '$lib/layouts/bottom-bar.svelte'
    import Nprogress from '$lib/layouts/nprogress.svelte'
    import ThemeProvider from '$lib/providers/theme.svelte'
    import OpenGraph from '$lib/atoms/open-graph.svelte'

    import 'virtual:windi.css'
    import '../styles/global.sass'
</script>

<OpenGraph />

<ThemeProvider />
<Nprogress />
<AppBar />
<slot />
<BottomBar />
