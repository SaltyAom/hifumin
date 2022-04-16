<script lang="ts">
    import { page, navigating } from '$app/stores'
    import { goto } from '$app/navigation'

    import {
        BookmarkIcon,
        ChevronLeftIcon,
        SearchIcon,
        SendIcon,
        SettingsIcon
    } from 'svelte-feather-icons'
    import user from '$lib/stores/user'

    let search
    // For mobile devices
    let searchActive = false

    $: hidenOnSearch = searchActive ? 'hidden' : 'flex'

    let searchBox: HTMLInputElement

    const openSearch = () => {
        searchActive = true

        requestAnimationFrame(() => {
            // For Safari
            requestAnimationFrame(() => {
                searchBox?.focus()
            })
        })
    }

    const closeSearch = () => {
        searchActive = false
    }

    const isNumeric = (n: string) => !isNaN(+n) && isFinite(+n)

    const find = () => {
        closeSearch()

        if ($navigating) return

        if (!search) return goto('/')
        if (isNumeric(search)) return goto(`/h/${search}`)

        goto(`/search/${search}`)
    }

    $: applyActive = (path: string) =>
        (
            path === '/'
                ? $page.url.pathname === '/'
                : $page.url.pathname.startsWith(path)
        )
            ? 'text-blue-500 dark:text-blue-500 bg-blue-50 dark:bg-blue-900/50'
            : ''
</script>

<nav
    class="sticky z-30 top-0 flex justify-between items-center gap-1 h-16 safe-area {searchActive
        ? 'px-0'
        : 'px-4'} md:px-4 border-b bg-white dark:bg-gray-800 dark:border-b-gray-600"
>
    <a
        class="{hidenOnSearch} md:inline lg:min-w-[192px] text-xl font-medium text-gray-700 dark:text-gray-300"
        role="heading"
        aria-level={1}
        href="/"
    >
        Hifumin
    </a>

    <form
        on:submit|preventDefault={find}
        class="{searchActive
            ? 'flex'
            : 'hidden'} md:flex items-center gap-2 w-full md:w-[42ch] pl-2.5 md:pl-4 pr-4 md:pr-1.5 h-12 bg-transparent md:bg-gray-100 md:dark:bg-gray-700 rounded-full"
    >
        <button
            class="flex md:hidden w-10 h-10 p-1 text-gray-600 dark:text-gray-300"
            on:click|preventDefault={closeSearch}
            type="button"
            aria-label="Close search"
        >
            <ChevronLeftIcon />
        </button>
        <SearchIcon
            size="24"
            class="hidden md:flex text-gray-500 dark:text-gray-400"
        />
        <input
            class="appearance-none w-full h-full text-lg text-gray-700 dark:text-gray-200 bg-transparent focus:outline-none"
            id="search"
            name="search"
            placeholder="Find Hentai or 6 digits code"
            inputmode="search"
            type="search"
            aria-label="Search"
            bind:this={searchBox}
            bind:value={search}
        />
        <button
            class="appearance-none flex justify-center items-center min-w-[2.25em] min-h-[2.25em] rounded-full hover:bg-white focus:bg-white dark:hover:bg-gray-800 dark:focus:bg-gray-800 hover:shadow-sm focus:shadow-sm transition-colors"
            type="submit"
        >
            <SendIcon
                size="21"
                class="text-gray-500 dark:text-gray-300 dark:md:text-gray-400"
            />
        </button>
    </form>

    <section
        class="{hidenOnSearch} justify-end items-center gap-2 min-w-[192px]"
    >
        <div class="hidden md:flex gap-2 text-gray-500 dark:text-gray-400 px-2">
            <a
                href="/favorite"
                class={`w-10 h-10 p-2 rounded-2xl ${applyActive('/favorite')}`}
                title="Bookmark and History"
                aria-label="Bookmark and History"
            >
                <BookmarkIcon />
            </a>

            <a
                href="/settings"
                class={`w-10 h-10 p-2 rounded-2xl ${applyActive('/settings')}`}
                title="Settings"
                aria-label="Settings"
            >
                <SettingsIcon />
            </a>
        </div>

        <div class="flex md:hidden flex-1 justify-end items-center h-full ml-1">
            <button
                class="w-10 h-10 p-2 text-gray-500 dark:text-gray-300"
                on:click={openSearch}
                aria-label="Open Search"
            >
                <SearchIcon />
            </button>
        </div>

        {#if $user}
            <a
                href="/profile"
                class="{hidenOnSearch} w-9 h-9 bg-gray-100 dark:bg-gray-700 rounded-full"
            >
                <img
                    class="w-9 h-9 object-cover rounded-full"
                    src={'/assets/images/cat.webp'}
                    alt="Takodachi"
                />
            </a>
        {:else}
            <a
                href="/signin"
                class="{hidenOnSearch} text-lg text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 px-4 py-1.5 rounded-2xl hover:rounded-lg focus:rounded-lg transition-all"
                >Sign in</a
            >
        {/if}
    </section>
</nav>

<style lang="sass">
    .safe-area
        padding-bottom: env(safe-area-inset-top)
</style>
