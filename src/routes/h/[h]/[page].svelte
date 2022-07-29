<script context="module" lang="ts">
    import { goto } from '$app/navigation'

    import { hentaiById, type HentaiByIdData } from '@gql'

    export async function load({ params }) {
        const { h, page } = params
        const hentai = await hentaiById(+h)

        if (!hentai || page < 1 || page > hentai.info.amount) return

        return {
            cache: {
                maxage: 3600,
                private: true
            },
            props: {
                hentai,
                page: +page
            }
        }
    }
</script>

<script lang="ts">
    import { onMount } from 'svelte'
    import { browser } from '$app/env'

    import { settings, ReaderType } from '@stores'

    import {
        XIcon,
        ChevronLeftIcon,
        ChevronRightIcon
    } from 'svelte-feather-icons'

    export let hentai: HentaiByIdData
    export let page: number

    $: {
        if (browser) {
            page

            if (page <= pages.length) prefetchPage(page)
            if (page > 1) prefetchPage(page - 2)
        }
    }

    $: ({
        id,
        title: { display },
        images: { pages }
    } = hentai)
    $: link = pages[page - 1]?.link || ''
    $: digit = pages.length.toString().length
    // Since we already have service worker, no prevention logic is need
    const prefetchPage = (page: number) => {
        const image = new Image()
        const src = pages[page]?.link

        if (src) image.src = src
    }

    onMount(() => {
        if ($settings.reader !== ReaderType.interactive)
            settings.update((v) => ({
                ...v,
                reader: ReaderType.interactive
            }))
    })

    let prePage = +page

    const changePage = () => {
        if (prePage < 0) page = 1
        else if (prePage > pages.length) page = pages.length

        page = +prePage

        goto(`/h/${id}/${page}`, {
            keepfocus: true,
            noscroll: true,
            replaceState: true
        })
    }

    const prevPage = () => {
        prePage = +page - 1

        if (prePage < 1) return goto(`/h/${id}`)

        page = prePage

        goto(`/h/${id}/${page}`, {
            replaceState: true,
            keepfocus: true,
            noscroll: true
        })
    }

    const nextPage = () => {
        prePage = +page + 1

        if (prePage > pages.length) return goto(`/h/${id}`)

        page = prePage

        goto(`/h/${id}/${page}`, {
            replaceState: true,
            keepfocus: true,
            noscroll: true
        })
    }

    const handleKeyPress = ({ key }: KeyboardEvent) => {
        if (key === 'ArrowLeft') return prevPage()
        if (key === 'ArrowRight') return nextPage()
        if (key === 'Escape') return goto(`/h/${id}#page-${page}`)
    }
</script>

<svelte:window on:keydown={handleKeyPress} />

<svelte:head>
    <meta name="robots" content="noindex" />
    <link rel="preload" as="image" href={link} />
</svelte:head>

<main class="relative flex flex-col items-center w-full h-screen mx-auto">
    <aside
        class="flex justify-center items-center gap-2 h-8 pr-10 text-gray-600 dark:text-gray-400"
    >
        <a class="w-8 h-8 p-1 opacity-50" href={`/h/${id}#page-${page}`}>
            <XIcon class="w-full" />
        </a>
        <a
            class="w-8 h-8 p-1"
            on:click|preventDefault={prevPage}
            href={page > 1 ? `/h/${id}/${page - 1}` : `/h/${id}`}
        >
            <ChevronLeftIcon class="w-full" />
        </a>
        <form
            on:submit|preventDefault={changePage}
            class="flex items-center gap-1.5"
        >
            <input
                type="tel"
                min={0}
                max={pages.length}
                class="px-[0.5ch] text-center outline-none bg-gray-100 dark:bg-gray-700 rounded"
                style="width:{digit + 2}ch;"
                bind:value={prePage}
                on:blur={changePage}
            />
            of {pages.length}
        </form>
        <a
            class="w-8 h-8 p-1"
            on:click|preventDefault={nextPage}
            href={page + 1 < pages.length ? `/h/${id}/${page + 1}` : `/h/${id}`}
        >
            <ChevronRightIcon class="w-full" />
        </a>
    </aside>

    <div class="relative h-page">
        <img
            src={link}
            class="h-full object-contain"
            alt={`page ${page}, ${display}`}
        />
    </div>

    <aside
        class="flex justify-center items-center gap-2 h-8 pr-10 text-gray-600 dark:text-gray-400"
    >
        <a class="w-8 h-8 p-1 opacity-50" href={`/h/${id}#page-${page}`}>
            <XIcon class="w-full" />
        </a>
        <a
            class="w-8 h-8 p-1"
            sveltekit:noscroll
            on:click|preventDefault={prevPage}
            href={page > 1 ? `/h/${id}/${page - 1}` : `/h/${id}`}
        >
            <ChevronLeftIcon class="w-full" />
        </a>
        <form
            on:submit|preventDefault={changePage}
            class="flex items-center gap-1.5"
        >
            <input
                type="tel"
                min={0}
                max={pages.length}
                class="px-[0.5ch] text-center outline-none bg-gray-100 dark:bg-gray-700 rounded"
                style="width:{digit + 2}ch;"
                bind:value={prePage}
                on:blur={changePage}
            />
            of {pages.length}
        </form>
        <a
            class="w-8 h-8 p-1"
            sveltekit:noscroll
            on:click|preventDefault={nextPage}
            href={page + 1 < pages.length ? `/h/${id}/${page + 1}` : `/h/${id}`}
        >
            <ChevronRightIcon class="w-full" />
        </a>
    </aside>

    <div class="flex absolute top-8 w-full h-full z-10 h-page" aria-hidden>
        <div class="flex flex-1" on:click={prevPage} />
        <div class="flex flex-1" on:click={nextPage} />
    </div>
</main>

<style lang="sass">
    .h-page
        height: calc(100vh - (2em * 2))

    // .h-page
    //     height: calc(100vh - (4em + 2em * 2))
</style>
