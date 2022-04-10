<script lang="ts">
    import { collectionsArray, collectionsCover } from '$lib/stores/collections'

    import SkeletonCover from '$lib/skeletons/cover.svelte'
    import Image from '$lib/atoms/image.svelte'

    console.log($collectionsCover)
</script>

<div class="flex flex-col w-full max-w-5xl mx-auto gap-6 px-4 py-6 md:py-12">
    <h1 class="text-gray-700 dark:text-gray-300 font-medium text-3xl md:text-4xl">Collection</h1>
    <main
        class="grid collection gap-6 text-gray-700 dark:text-gray-300"
    >
        {#each $collectionsArray as { name, h, id } (name)}
            {@const cover = $collectionsCover[name]}
            <article class="w-full">
                <a
                    class="relative flex flex-col gap-1"
                    href="/collection/{id}"
                    sveltekit:prefetch
                >
                    {#if cover}
                        <Image
                            parentClass="rounded-lg shadow-xl overflow-hidden mb-2"
                            class="object-cover object-center"
                            src={cover.images.cover.link}
                            width={cover.images.cover.info
                                .width}
                            height={cover.images.cover.info
                                .height}
                        />
                        <h1
                            class="text-gray-500 dark:text-gray-300 text-2xl font-medium"
                        >
                            {name}
                        </h1>
                        <div
                            class="flex gap-2 items-center text-gray-400 capitalize"
                        >
                            {h.length} stories
                        </div>
                    {:else}
                        <SkeletonCover />
                    {/if}
                </a>
            </article>
        {/each}
    </main>
</div>

<style lang="sass">
    // .read-more
    //     padding-bottom: 144.74%

    .collection
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))

        @screen sm
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))

        @screen md
            grid-template-columns: repeat(auto-fill, minmax(210px, 1fr))

        @media (max-width: 483px)
            & > article:nth-child(2)
                display: none

    @media (max-width: 327px)
        .collection > article
            display: none

        // .read-more
        //     padding-bottom: 100%
</style>
