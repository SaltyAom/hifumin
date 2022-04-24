<script lang="ts">
    import nhqlSearch from '$lib/gql/nhqlSearch'
    import type { NhqlSearchData } from '$lib/gql/nhqlSearch'

    import { page as sveltePage } from '$app/stores'

    import Cover from '$lib/atoms/cover.svelte'
    import { getTotalMasonry, chunkHentai } from '$lib/array'
    import { isServer } from '$lib/utils'
    import OpenGraph from '$lib/atoms/open-graph.svelte'

    import { page as path } from '$app/stores'
    import SearchNotFound from '$lib/atoms/search-not-found.svelte'
    import SkeletonCover from '$lib/skeletons/cover.svelte'

    let hentais: NhqlSearchData[] = []
    let page = 1
    let isLoading = false
    let over = false

    $: shadowIds = [...hentais.map((h) => h.id)]
    $: search = $path.params.search

    sveltePage.subscribe(async (newPage) => {
        if (!newPage || isLoading) return

        isLoading = true

        try {
            hentais = await nhqlSearch(newPage.params.search)
        } catch (err) {
        } finally {
            page = 1
            isLoading = false
            over = false
        }

        handleScroll()
    })

    let layoutWidth: number
    $: totalMasonry = getTotalMasonry(layoutWidth)
    $: chunkHentais = chunkHentai(totalMasonry, hentais)

    let toleratedError = false

    const appendNhentai = async () => {
        if (isServer) return

        try {
            isLoading = true

            const newHentais = await nhqlSearch(search, page)
            hentais = [
                ...hentais,
                ...newHentais.filter((h) => !shadowIds.includes(h.id))
            ]

            if (newHentais.length === 0)
                throw new Error('Maybe API error, skip to next')

            if (newHentais.length < 25) over = true

            toleratedError = false
        } catch (err) {
            if (toleratedError) over = true

            toleratedError = true
        } finally {
            isLoading = false
            page++
        }
    }

    let observer: HTMLElement

    const handleScroll = async () => {
        if (isServer || isLoading) return

        let { scrollY: offset, innerHeight: windowHeight } = window

        if (
            isLoading ||
            over ||
            (observer?.offsetTop || 0) - windowHeight * 2 > offset
        )
            return

        await appendNhentai()
        handleScroll()
    }

    handleScroll()
</script>

<svelte:window on:scroll={handleScroll} />

<svlte:head>
    <meta name="robot" content="noindex, nofollow" />
</svlte:head>

<OpenGraph
    title="Search: {search} &raquo; Hifumin: hentai doujinshi and manga"
/>

<main
    class="flex w-full px-2 md:px-4 overflow-hidden"
    bind:clientWidth={layoutWidth}
>
    {#if isServer}
        <h1
            class="flex justify-center items-center w-full h-app text-2xl pb-16 text-gray-200 dark:text-gray-600 cursor-default"
        >
            Hifumin
        </h1>
    {:else if over && !hentais.length}
        <SearchNotFound />
    {:else if !hentais.length}
        {#each Array(totalMasonry).fill(0) as _}
            <div
                class="flex flex-col flex-1 w-full gap-4 lg:gap-5 px-2 lg:px-2.5 py-4 overflow-hidden"
            >
                {#each Array(~~(50 / totalMasonry)).fill(0) as __}
                    <SkeletonCover />
                {/each}
            </div>
        {/each}
    {:else}
        {#each chunkHentais as row, index (index)}
            <div
                class="flex flex-col flex-1 w-full gap-4 lg:gap-5 px-2 lg:px-2.5 py-4 overflow-hidden"
            >
                {#each row as hentai (hentai.id)}
                    <Cover {hentai} />
                {/each}
                {#if index === 0}
                    <div bind:this={observer} />
                {/if}
                {#if !over}
                    {#each Array(~~(25 / totalMasonry)).fill(0) as __}
                        <SkeletonCover />
                    {/each}
                {/if}
            </div>
        {/each}
    {/if}
</main>
