<script lang="ts">
    import { onMount } from 'svelte'
    import { page as path } from '$app/stores'
    import { beforeNavigate } from '$app/navigation'
    import { browser } from '$app/env'

    import { Cover, OpenGraph, SearchNotFound } from '@shared'
    import { SkeletonCover } from '@skeletons'
    import { search as a, type Cover as CoverData } from '@gql'
    import { getTotalMasonry, chunkHentai } from '@services'

    let hentais: CoverData[] = []
    let page = 1
    let isLoading = false
    let over = false

    $: shadowIds = hentais.map((h) => h.id)
    $: search = $path.params.search

    path.subscribe(async ({ params: { search: query } }) => {
        if (isLoading || !search) return

        isLoading = true

        try {
            hentais = await a(query)
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
        if (!browser) return

        try {
            isLoading = true

            const newHentais = await a(search, page)
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
        if (!browser || isLoading) return

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

    onMount(handleScroll)

    beforeNavigate(() => {
        over = true
    })
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
    {#if !browser}
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
