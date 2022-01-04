<script lang="ts">
    import nhqlSearch from '$lib/gql/nhqlSearch'
    import type { NhqlSearchData } from '$lib/gql/nhqlSearch'

    import { randomBetween } from '$lib/array'
    import { tags } from '$lib/data'

    import Cover from '$lib/atoms/cover.svelte'
    import { getTotalMasonry, chunkHentai } from '$lib/array'
    import { isServer } from '$lib/utils'

    import { get } from 'svelte/store'
    import settings from '$lib/stores/settings'

    export let hentais: NhqlSearchData[] = []

    $: shadowIds = [...hentais.map((h) => h.id)]

    let page = 1
    let isLoading = false
    let over = false

    const {
        preference: { data: includes, enable }
    } = get(settings)

    const defaultTags = [...(enable ? includes : tags)]
    let availables = [...defaultTags]

    // Bind resizable window width
    let layoutWidth: number
    $: totalMasonry = getTotalMasonry(layoutWidth)
    $: chunkHentais = chunkHentai(totalMasonry, hentais)

    const appendNhentai = async () => {
        if (isLoading) return

        const newTagIndex = randomBetween(0, availables.length - 1)

        try {
            isLoading = true

            const newHentais = await nhqlSearch(
                availables.splice(newTagIndex, 1)[0],
                page
            )

            hentais = [
                ...hentais,
                ...newHentais.filter((h) => !shadowIds.includes(h.id))
            ]

            if (newHentais.length < 25) throw new Error('No more hentai')
        } catch (err) {
            defaultTags.splice(newTagIndex, 1)

            if (defaultTags.length === 0) over = true
        } finally {
            isLoading = false

            if (!availables.length) page++

            availables = [...defaultTags]
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

<svelte:head>
    <title>Hifumin: hentai doujinshi and manga</title>
</svelte:head>

<main class="flex gap-4 lg:gap-5 w-full p-4" bind:clientWidth={layoutWidth}>
    {#if !layoutWidth}
        <h1
            class="flex justify-center items-center w-full h-app text-2xl pb-16 text-gray-200 dark:text-gray-600 cursor-default"
        >
            Hifumin
        </h1>
    {:else if over && !hentais.length}
        <h1>Not Found</h1>
    {:else if !hentais.length}
        {#each Array(totalMasonry).fill(0) as _, index (index)}
            <div class="flex flex-col flex-1 w-full gap-4 lg:gap-5">
                {#each Array(~~(50 / totalMasonry)).fill(0) as __, index (index)}
                    <figure
                        class="w-full rounded-xl bg-gray-50 dark:bg-gray-700"
                        style="padding-bottom: 145%"
                    />
                {/each}
            </div>
        {/each}
    {:else}
        {#each chunkHentais as row, index (index)}
            <div class="flex flex-col flex-1 w-full gap-4 lg:gap-5">
                {#each row as hentai (hentai.id)}
                    <Cover {hentai} />
                {/each}
                {#if index === 0}
                    <div bind:this={observer} />
                {/if}
                {#if !over}
                    {#each Array(~~(25 / totalMasonry)).fill(0) as __}
                        <figure
                            class="w-full rounded-xl bg-gray-50 dark:bg-gray-700"
                            style="padding-bottom: 145%"
                        />
                    {/each}
                {/if}
            </div>
        {/each}
    {/if}
</main>
