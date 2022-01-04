<script>
    import { darkTheme } from '$lib/stores/settings'

    import { isServer } from '$lib/utils'

    darkTheme.subscribe((isDark) => {
        if (isServer) return

        if (isDark) document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
    })
</script>
