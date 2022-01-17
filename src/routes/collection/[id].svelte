<script lang="ts">
    import { collectionsArray, collectionsData } from '$lib/stores/collections'
    import { page } from '$app/stores'

    import Image from '$lib/atoms/image.svelte'

    $: collection = $collectionsArray.find(({ id }) => $page.params.id === id)
</script>

<main
    class="flex flex-col gap-12 w-full max-w-3xl mx-auto py-8 text-gray-700 dark:text-gray-300"
>
    {#if collection}
        <section class="flex flex-col gap-4 px-4">
            <header class="flex flex-col">
                <p class="text-gray-400 text-sm font-light">
                    {collection.h.length} stories
                </p>
                <h2 class="text-3xl text-gray-700 dark:text-gray-300 font-medium">
                    {collection.name}
                </h2>
            </header>
            <div class="relative grid collection w-full gap-4 md:gap-8">
                {#each collection.h as id}
                    <article class="w-full">
                        <a
                            class="relative flex flex-col gap-2"
                            href="/h/{id}"
                            sveltekit:prefetch
                        >
                            {#if $collectionsData[id]}
                                <Image
                                    parentClass="rounded-lg shadow-xl overflow-hidden"
                                    class="object-cover object-center"
                                    src={$collectionsData[id].images.cover.link}
                                    width={$collectionsData[id].images.cover
                                        .info.width}
                                    height={$collectionsData[id].images.cover
                                        .info.height}
                                />
                                <h1 class="text-gray-500">
                                    {$collectionsData[id].title.display}
                                </h1>
                                <div
                                    class="flex gap-2 items-center text-gray-400 capitalize"
                                >
                                    <img
                                        src="/icons/language.svg"
                                        class="w-5 h-5"
                                        alt="Language icon"
                                    />
                                    {$collectionsData[id].metadata.language}
                                </div>
                            {:else}
                                <h1>Loading 2</h1>
                            {/if}
                        </a>
                    </article>
                {/each}
            </div>
        </section>
    {:else}
        <h1
            class="flex justify-center items-center w-full h-app text-2xl pb-16 text-gray-200 dark:text-gray-600 cursor-default"
        >
            Hifumin
        </h1>
    {/if}
</main>

<style lang="sass">
    .collection
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))

        @screen sm
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))

        @screen md
            grid-template-columns: repeat(auto-fill, minmax(210px, 1fr))
</style>
