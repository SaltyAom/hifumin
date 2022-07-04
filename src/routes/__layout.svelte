<script lang="ts">
    import AuthProvider from '$lib/providers/authProvider.svelte'
    import ThemeProvider from '$lib/providers/theme.svelte'

    import AppBar from '$lib/layouts/app-bar.svelte'
    import BottomBar from '$lib/layouts/bottom-bar.svelte'
    import Nprogress from '$lib/layouts/nprogress.svelte'

    import OpenGraph from '$lib/atoms/open-graph.svelte'
    import Analytic from '$lib/atoms/analytic.svelte'

    import 'virtual:windi.css'
    import '../styles/global.sass'
</script>

<AuthProvider />
<ThemeProvider />

<OpenGraph />
<Analytic />

<Nprogress />
<AppBar />
<slot />
<BottomBar />
