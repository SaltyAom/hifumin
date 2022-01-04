<script lang="ts">
    import AppLayout from '$lib/layouts/app.svelte'
    import ThemeProvider from '$lib/providers/theme.svelte'

    import '../styles/tailwind.css'
</script>

<ThemeProvider />
<AppLayout />
<slot />
