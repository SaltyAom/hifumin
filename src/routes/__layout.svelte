<script lang="ts">
    import AppBar from '$lib/layouts/app-bar.svelte'
    import BottomBar from '$lib/layouts/bottom-bar.svelte'

    import ThemeProvider from '$lib/providers/theme.svelte'

    import '../styles/tailwind.css'
</script>

<ThemeProvider />
<AppBar />
<slot />
<BottomBar />
