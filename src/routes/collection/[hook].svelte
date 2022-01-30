<script context="module" lang="ts">
    import supabase from '$lib/supabase'

    import type { Collection } from '$lib/stores/collections'

    import nhqlMultipleCoverById from '$lib/gql/nhqlMultipleCover'
    import type { NhqlCoverPreview } from '$lib/gql/nhqlMultipleCover'

    export async function load({ params }) {
        const { data } = await supabase
            .from<Collection>('collections')
            .select('name, detail, h')
            .eq('id', params.hook)
            .eq('shared', true)

        if (!data || !data?.length)
            return {
                fallthrough: true
            }

        const multipleCover = await nhqlMultipleCoverById(
            (data as Collection[]).slice(0, 25).flatMap(({ h }) => h)
        )

        if (!multipleCover || !multipleCover?.length)
            return {
                fallthrough: true
            }

        const coverMap: Record<number, NhqlCoverPreview> = {}

        multipleCover.forEach(({ success, data: cover }) => {
            if (success) coverMap[cover.id] = cover
        })

        return {
            props: {
                collection: {
                    ...data[0],
                    h: [...data[0].h].reverse()
                },
                coverMap
            }
        }
    }
</script>

<script lang="ts">
    import { ChevronLeftIcon } from 'svelte-feather-icons'

    import Image from '$lib/atoms/image.svelte'
    import SkeletonCover from '$lib/skeletons/cover.svelte'

    import intersect from '$lib/use/intersect'

    export let collection: Collection
    export let coverMap: Record<number, NhqlCoverPreview> = {}

    const { h = [], name } = collection ?? {}

    let requesteds: number[] = []
    let requesting = false

    const requestData = (id: number) => () => {
        if (requesteds.length >= 25 || requesteds.includes(id)) return

        requesteds.push(id)

        if (requesting) return
        requesting = true

        setTimeout(async () => {
            try {
                const _covers = await nhqlMultipleCoverById(requesteds)

                _covers.forEach(({ success, data: cover }) => {
                    if (success) coverMap[cover.id] = cover
                })
            } catch (e) {
            } finally {
                requesting = false
            }
        }, 80)
    }
</script>

<main
    class="flex flex-col gap-4 w-full max-w-5xl mx-auto px-4 py-4 md:py-8 text-gray-700 dark:text-gray-300"
>
    <div>
        <a
            href="/collection"
            class="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 py-1 rounded"
            ><ChevronLeftIcon class="w-6 h-6" /> Back</a
        >
    </div>
    <header class="flex flex-col">
        <p class="text-gray-400 text-sm font-light">
            {h.length} stories (shared)
        </p>
        <h2 class="text-3xl text-gray-700 dark:text-gray-300 font-medium">
            {name}
        </h2>
    </header>
    <div class="relative grid collection w-full gap-6 md:gap-8">
        {#each h as id}
            <article class="w-full">
                <a
                    class="relative flex flex-col gap-2"
                    href="/h/{id}"
                    sveltekit:prefetch
                >
                    {#if coverMap[id]}
                        <Image
                            parentClass="rounded-lg shadow-xl overflow-hidden"
                            class="object-cover object-center"
                            src={coverMap[id].images.cover.link}
                            width={coverMap[id].images.cover.info.width}
                            height={coverMap[id].images.cover.info.height}
                        />
                        <h1 class="text-gray-500 dark:text-gray-300">
                            {coverMap[id].title.display}
                        </h1>
                        <div
                            class="flex gap-2 items-center text-gray-400 capitalize"
                        >
                            <img
                                src="/icons/language.svg"
                                class="w-5 h-5"
                                alt="Language icon"
                            />
                            {coverMap[id].metadata.language}
                        </div>
                    {:else}
                        <div use:intersect on:intersect={requestData(id)}>
                            <SkeletonCover />
                        </div>
                    {/if}
                </a>
            </article>
        {/each}
    </div>
</main>

<style lang="sass">
    .collection
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))

        @screen sm
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))
</style>
