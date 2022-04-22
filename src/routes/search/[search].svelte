<script context="module" lang="ts">
    import nhqlSearch from '$lib/gql/nhqlSearch'
    import type { NhqlSearchData } from '$lib/gql/nhqlSearch'

    export async function load({ params }) {
        const { search } = params

        return {
            maxage: 3600,
            props: {
                search,
                nhql: await nhqlSearch(search)
            }
        }
    }
</script>

<script lang="ts">
    import { page as sveltePage } from '$app/stores'

    import Cover from '$lib/atoms/cover.svelte'
    import { getTotalMasonry, chunkHentai } from '$lib/array'
    import { isServer } from '$lib/utils'
    import OpenGraph from '$lib/atoms/open-graph.svelte'

    export let nhql: NhqlSearchData[]
    export let search: string

    let hentais: NhqlSearchData[] = [...nhql]
    let page = 2
    let isLoading = false
    let over = false

    $: shadowIds = [...hentais.map((h) => h.id)]

    sveltePage.subscribe(async (newPage) => {
        if (!newPage || isLoading) return

        isLoading = true

        try {
            hentais = await nhqlSearch(newPage.params.search)
        } catch (err) {
        } finally {
            page = 2
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
        try {
            isLoading = true

            const newHentais = await nhqlSearch(search, page)
            hentais = [
                ...hentais,
                ...newHentais.filter((h) => !shadowIds.includes(h.id))
            ]

            if (newHentais.length < 25) over = true
        } catch (err) {
            if (toleratedError) over = true

            toleratedError = true
        } finally {
            toleratedError = false
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
        <h1>Not Found</h1>
    {:else if !hentais.length}
        {#each Array(totalMasonry).fill(0) as _}
            <div
                class="flex flex-col flex-1 w-full gap-4 lg:gap-5 px-2 lg:px-2.5 py-4 overflow-hidden"
            >
                {#each Array(~~(50 / totalMasonry)).fill(0) as __}
                    <figure
                        class="w-full rounded-4xl bg-gray-50 dark:bg-gray-700"
                        style="padding-bottom: 145%"
                    />
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
                        <figure
                            class="w-full rounded-4xl bg-gray-50 dark:bg-gray-700"
                            style="padding-bottom: 145%"
                        />
                    {/each}
                {/if}
            </div>
        {/each}
    {/if}
</main>
