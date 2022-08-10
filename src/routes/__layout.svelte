<script lang="ts">
    import { AuthProvider, ThemeProvider } from '@providers'

    import { AppBar, BottomBar } from '@layouts'
    import { OpenGraph, Analytic } from '@shared'

    import 'virtual:windi.css'
    import '@styles/global.sass'
</script>

<AuthProvider />
<ThemeProvider />

<Analytic />

<AppBar />
<slot />
<BottomBar />
