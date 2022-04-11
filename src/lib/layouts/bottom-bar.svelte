<script lang="ts">
    import { page } from '$app/stores'

    import { BookmarkIcon, HomeIcon, SettingsIcon } from 'svelte-feather-icons'

    $: applyActive = (path: string) =>
        (
            path === '/'
                ? $page.url.pathname === '/'
                : $page.url.pathname.startsWith(path)
        )
            ? '-active text-blue-400 dark:text-blue-500'
            : ''

    const tabClass =
        'flex flex-col flex-1 justify-center items-center gap-0.5 font-medium text-xs text-gray-400 dark:text-gray-400 font-light !bg-transparent'
</script>

<div class="block md:hidden h-16 box-content safe-area" />
<aside
    class="box-content sare-area fixed z-30 bottom-0 flex md:hidden items-center w-full h-16 bg-white dark:bg-gray-800 border-t dark:border-gray-600"
>
    <a class="{tabClass} {applyActive('/')}" href="/">
        <div class="icon">
            <HomeIcon class="icon w-6 h-6" strokeWidth={1.5} />
        </div>
        Home
    </a>
    <a class="{tabClass} {applyActive('/settings')}" href="/settings">
        <div class="icon">
            <SettingsIcon class="w-6 h-6" strokeWidth={1.5} />
        </div>
        Settings
    </a>
</aside>

<style lang="sass">
    .safe-area
        padding-bottom: env(safe-area-inset-bottom)

    .icon
        @apply px-6 py-1 rounded-full transition-colors

    .-active
        & > .icon
            @apply bg-blue-50
</style>
