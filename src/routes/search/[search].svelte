<script context="module" lang="ts">
    import nhqlSearch from '$lib/gql/nhqlSearch'
    import type { NhqlSearchData } from '$lib/gql/nhqlSearch'

    export async function load({ page }) {
        const {
            params: { search }
        } = page

        return {
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

    export let nhql: NhqlSearchData[]
    export let search: string

    let hentais: NhqlSearchData[] = nhql
    let page = 2
    let isLoading = false
    let over = false

    sveltePage.subscribe(async (newPage) => {
        if (!newPage) return

        isLoading = true

        try {
            hentais = await nhqlSearch(newPage.params.search)
        } catch (err) {
        } finally {
            page = 2
            isLoading = false
            over = false
        }
    })

    let layoutWidth: number
    $: totalMasonry = getTotalMasonry(layoutWidth)
    $: chunkHentais = chunkHentai(totalMasonry, hentais)

    const appendNhentai = async () => {
        try {
            isLoading = true

            const newHentais = await nhqlSearch(search, page)
            hentais = [...hentais, ...newHentais]

            if (!newHentais.length) return
        } catch (err) {
        } finally {
            isLoading = false
            page++
        }
    }

    const handleScroll = async () => {
        if (typeof window === 'undefined') return

        let { scrollY: offset, innerHeight: windowHeight } = window

        if (
            isLoading ||
            over ||
            document.body.clientHeight - windowHeight * 2 > offset
        )
            return

        await appendNhentai()
        handleScroll()
    }

    handleScroll()
</script>

<svelte:window on:scroll={handleScroll} />

<main class="flex gap-4 w-full p-4" bind:clientWidth={layoutWidth}>
    {#if !layoutWidth}
        {#each Array(totalMasonry).fill(0) as _}
            <div class="flex flex-col flex-1 w-full gap-4">
                {#each Array(~~(50 / totalMasonry)).fill(0) as __}
                    <figure
                        class="w-full rounded bg-gray-50"
                        style="padding-bottom: 145%"
                    />
                {/each}
            </div>
        {/each}
    {:else}
        {#each chunkHentais as row, index (index)}
            <div class="flex flex-col flex-1 w-full gap-4">
                {#each row as hentai (hentai.id)}
                    <Cover {hentai} />
                {/each}
                {#each Array(~~(25 / totalMasonry)).fill(0) as __}
                    <figure
                        class="w-full rounded bg-gray-50"
                        style="padding-bottom: 145%"
                    />
                {/each}
            </div>
        {/each}
    {/if}
</main>

{#if !over}
    <button on:click={appendNhentai}
        >{isLoading ? 'Loading...' : 'Load more'}</button
    >
{/if}
