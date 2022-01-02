<script context="module">
    import { client } from '@saltyaom/gq'

    import '../styles/tailwind.css'

    client.config('https://akashic.opener.studio/v1/graphql')
</script>

<script lang="ts">
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'

    import {
        BookmarkIcon,
        SearchIcon,
        SendIcon,
        SettingsIcon
    } from 'svelte-feather-icons'

    let search

    const isNumeric = (n: string) => !isNaN(+n) && isFinite(+n)

    const find = () => {
        if (!search) return goto('/')
        if (isNumeric(search)) return goto(`/h/${search}`)

        goto(`/search/${search}`)
    }

    $: applyActive = (path: string) =>
        $page.url.pathname.startsWith(path) ? 'text-blue-500 bg-gray-100' : ''
</script>

<nav
    class="sticky z-30 top-0 flex justify-between items-center h-16 px-4 border-b bg-white"
>
    <a
        class="text-xl font-medium text-gray-700"
        role="heading"
        aria-level={1}
        href="/"
    >
        Hifumin
    </a>

    <form
        on:submit|preventDefault={find}
        class="flex items-center gap-2 w-[48ch] pl-4 pr-1.5 h-12 bg-gray-100 rounded"
    >
        <SearchIcon size="24" class="text-gray-500" />
        <input
            class="appearance-none w-full h-full text-lg text-gray-700 bg-transparent focus:outline-none"
            id="search"
            name="search"
            placeholder="Find Hentai or 6 digits code"
            aria-label="Search"
            bind:value={search}
        />
        <button
            class="appearance-none flex justify-center items-center min-w-[2.25em] min-h-[2.25em] rounded hover:bg-white focus:bg-white hover:shadow-sm focus:shadow-sm transition-colors"
        >
            <SendIcon size="21" class="text-gray-500" />
        </button>
    </form>

    <div class="flex justify-end items-center gap-2 text-gray-500 px-2">
        <a
            href="/collection"
            class={`w-10 h-10 p-2 rounded ${applyActive('/collection')}`}
            title="Bookmark and History"
            aria-label="Bookmark and History"
        >
            <BookmarkIcon />
        </a>

        <a
            href="/settings"
            class={`w-10 h-10 p-2 rounded ${applyActive('/settings')}`}
            title="Settings"
            aria-label="Settings"
        >
            <SettingsIcon />
        </a>
    </div>
</nav>

<slot />
