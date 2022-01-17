<script context="module" lang="ts">
    import supabase from '$lib/supabase'

    import type { Collection } from '$lib/stores/collections'

    import nhqlMultipleCoverById from '$lib/gql/nhqlMultipleCover'
    import type { NhqlCoverPreview } from '$lib/gql/nhqlMultipleCover'

    export async function load({ params }) {
        const { data } = await supabase
            .from('collections')
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
                collections: data,
                coverMap
            }
        }
    }
</script>

<script lang="ts">
    import Image from '$lib/atoms/image.svelte'

    export let collections: Collection[] = []
    export let coverMap: Record<number, NhqlCoverPreview> = {}
</script>

<main
    class="flex flex-col gap-12 w-full max-w-5xl mx-auto py-8 text-gray-700 dark:text-gray-300"
>
    {#each collections as { name, h } (name)}
        <section class="flex flex-col gap-4 px-4">
            <header class="flex flex-col">
                <p class="text-gray-400 text-sm font-light">
                    {h.length} stories (shared)
                </p>
                <h2
                    class="text-3xl text-gray-700 dark:text-gray-300 font-medium"
                >
                    {name}
                </h2>
            </header>
            <div class="relative grid collection w-full gap-4 md:gap-8">
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
                                    height={coverMap[id].images.cover.info
                                        .height}
                                />
                                <h1 class="text-gray-500">
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
                                <h1>Loading 2</h1>
                            {/if}
                        </a>
                    </article>
                {/each}
            </div>
        </section>
    {/each}
</main>

<style lang="sass">
    .collection
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))

        @screen sm
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))
</style>
