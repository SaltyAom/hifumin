<script lang="ts">
    import nhqlSearch from '$lib/gql/nhqlSearch'
    import nhqlMultipleCoverById from '$lib/gql/nhqlMultipleCover'
    import type { NhqlSearchData } from '$lib/gql/nhqlSearch'

    import { randomBetween, iterate } from '$lib/array'

    import Cover from '$lib/atoms/cover.svelte'
    import { getTotalMasonry, chunkHentai } from '$lib/array'
    import { isServer } from '$lib/utils'
    import { recommended } from '$lib/data'

    import { get } from 'svelte/store'
    import settings from '$lib/stores/settings'
    import OpenGraph from '$lib/atoms/open-graph.svelte'
    import SearchNotFound from '$lib/atoms/search-not-found.svelte'
    import SkeletonCover from '$lib/skeletons/cover.svelte'

    import hentais from '$lib/stores/hentais'

    $: shadowIds = $hentais.map((h) => h.id)

    // ? Increase chance that hentai is on mirror server (for bookmark)
    let page = 2
    let isLoading = false
    let over = false

    const {
        preference: { data: includes, enable }
    } = get(settings)

    const defaultTags = [
        ...(enable && includes.length ? new Set(includes) : recommended)
    ]
    let availables = [...defaultTags]

    // Bind resizable window width
    let layoutWidth: number
    $: totalMasonry = getTotalMasonry(layoutWidth)
    $: chunkHentais = chunkHentai(totalMasonry, $hentais)

    let maybeNhWentDown = false
    let tolerated = false

    const tryMultipleIdFallback = async () => {
        if (isLoading) return

        try {
            isLoading = true

            const newHentais = await nhqlMultipleCoverById(
                iterate(randomBetween(1, 400000), 25, randomBetween(1, 30))
            )

            if (!newHentais.length) throw new Error('No hentai found')

            $hentais = $hentais.concat(
                newHentais
                    .filter((h) => h.success && !shadowIds.includes(h.data.id))
                    .map((h) => h.data)
            )

            tolerated = false
        } catch (err) {
            if (tolerated) over = true
            else tolerated = true
        } finally {
            isLoading = false
        }
    }

    const appendNhentai = async () => {
        if (isLoading) return
        if (maybeNhWentDown) return tryMultipleIdFallback()

        const newTagIndex = randomBetween(0, availables.length - 1)

        try {
            isLoading = true

            const tag = availables.splice(newTagIndex, 1)[0]

            if (!tag) throw new Error('No tag available')

            const newHentais = await nhqlSearch(tag, page)

            $hentais = $hentais.concat(
                $hentais,
                newHentais.filter((h) => !shadowIds.includes(h.id))
            )

            if (newHentais.length < 25) throw new Error('No more hentai')
        } catch (err) {
            defaultTags.splice(newTagIndex, 1)

            if (defaultTags.length === 0) maybeNhWentDown = true
        } finally {
            isLoading = false

            if (!availables.length) {
                page++
                availables = [...defaultTags]
            }
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

    if (!$hentais.length) handleScroll()
</script>

<svelte:window on:scroll={handleScroll} />

<main
    class="flex w-full px-2 md:px-4 overflow-hidden"
    bind:clientWidth={layoutWidth}
>
    {#if !layoutWidth}
        <h1
            class="flex justify-center items-center w-full h-app text-2xl pb-16 text-gray-200 dark:text-gray-600 cursor-default"
        >
            Hifumin
        </h1>
    {:else if over && !$hentais.length}
        <SearchNotFound />
    {:else if !$hentais.length}
        {#each Array(totalMasonry).fill(0) as _, index (index)}
            <div
                class="flex flex-col flex-1 w-full gap-4 lg:gap-5 px-2 lg:px-2.5 py-4 overflow-hidden"
            >
                {#each Array(~~(50 / totalMasonry)).fill(0) as __, index (index)}
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
