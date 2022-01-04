<script lang="ts">
    import { page } from '$app/stores'

    import { BookmarkIcon, HomeIcon, SettingsIcon } from 'svelte-feather-icons'

    $: applyActive = (path: string) =>
        (
            path === '/'
                ? $page.url.pathname === '/'
                : $page.url.pathname.startsWith(path)
        )
            ? 'text-blue-500 dark:text-blue-500 bg-gray-100 dark:bg-blue-300/10'
            : ''

    const tabClass =
        'flex flex-col flex-1 justify-center items-center gap-1 text-xs text-gray-600 dark:text-gray-400 font-light !bg-transparent'
</script>

<div class="h-16 box-content safe-area" />
<aside
    class="box-content sare-area fixed z-30 bottom-0 flex md:hidden items-center w-full h-16 bg-white dark:bg-gray-800 border-t dark:border-gray-600"
>
    <a class="{tabClass} {applyActive('/')}" href="/">
        <HomeIcon class="w-6 h-6" strokeWidth={1.5} />
        Home
    </a>
    <a class="{tabClass} {applyActive('/collection')}" href="/collection">
        <BookmarkIcon class="w-6 h-6" strokeWidth={1.5} />
        Bookmark
    </a>
    <a class="{tabClass} {applyActive('/settings')}" href="/settings">
        <SettingsIcon class="w-6 h-6" strokeWidth={1.5} />
        Settings
    </a>
</aside>

<style lang="sass">
    .safe-area
        padding-bottom: env(safe-area-inset-bottom)
</style>
