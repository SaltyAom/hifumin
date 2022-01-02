<script context="module" lang="ts">
    import nhqlSearch from '$lib/gql/nhqlSearch'
    import type { NhqlSearchData } from '$lib/gql/nhqlSearch'

    import { randomBetween, randomPick } from '$lib/array'
    import { tags } from '$lib/data'

    import Cookie from 'cookie'

    const initialTag = randomPick(tags)

    /** @type {import('@sveltejs/kit').Load} */
    export async function load({ request, session }) {
        const cookie = Cookie.parse(session.cookie)

        return {
            props: {
                nhql: await nhqlSearch(initialTag),
                initialTag,
                initialWidth: cookie.w
            },
            maxage: 3600 * 3
        }
    }
</script>

<script lang="ts">
    import { onMount } from 'svelte'

    import Cover from '$lib/atoms/cover.svelte'
    import { getTotalMasonry, chunkHentai } from '$lib/array'

    export let nhql: NhqlSearchData[]
    export let hentais: NhqlSearchData[] = nhql
    export let initialTag: string
    export let initialWidth: number
    $: shadowIds = [...hentais.map((h) => h.id)]

    let page = 1
    let isLoading = false
    let over = false

    let availables = [...tags]
    availables.splice(availables.indexOf(initialTag), 1)

    let layoutWidth: number
    $: totalMasonry = getTotalMasonry(layoutWidth || initialWidth)
    $: chunkHentais = chunkHentai(totalMasonry, hentais)

    const appendNhentai = async () => {
        try {
            isLoading = true

            const newTagIndex = randomBetween(0, availables.length - 1)

            const newHentais = await nhqlSearch(
                availables.splice(newTagIndex, 1)[0],
                page
            )
            hentais = [
                ...hentais,
                ...newHentais.filter((h) => !shadowIds.includes(h.id))
            ]

            if (!newHentais.length) return
        } catch (err) {
            over = true
        } finally {
            isLoading = false

            if (!availables.length) page++

            availables = [...tags]
        }
    }

    let observer: HTMLElement

    const handleScroll = async () => {
        if (typeof window === 'undefined') return
        if (isLoading) return

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

    const saveWidth = () => {
        document.cookie = `w=${layoutWidth}`
    }

    onMount(() => {
        saveWidth()
    })

    handleScroll()
</script>

<svelte:window
    on:scroll={handleScroll}
    on:resize={saveWidth}
    on:beforeunload={saveWidth}
/>

<main class="flex gap-4 w-full p-4" bind:clientWidth={layoutWidth}>
    {#if !layoutWidth}
        {#each Array(totalMasonry).fill(0) as _, index (index)}
            <div class="flex flex-col flex-1 w-full gap-4">
                {#each Array(~~(50 / totalMasonry)).fill(0) as __, index (index)}
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
                {#if index === 0}
                    <div bind:this={observer} />
                {/if}
                {#if !over}
                    {#each Array(~~(25 / totalMasonry)).fill(0) as __}
                        <figure
                            class="w-full rounded bg-gray-50"
                            style="padding-bottom: 145%"
                        />
                    {/each}
                {/if}
            </div>
        {/each}
    {/if}
</main>
