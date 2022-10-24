<script>
    import { browser } from '$app/environment'

    import { darkTheme } from '@stores'

    darkTheme.subscribe((isDark) => {
        if (!browser) return

        if (isDark) document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
    })
</script>
