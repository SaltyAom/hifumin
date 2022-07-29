<script lang="ts">
    import { page } from '$app/stores'

    import { isServer } from '$lib/utils'

    import nhqlMultipleCoverById from '$lib/gql/nhqlMultipleCover'
    import type { NhqlCoverPreview } from '$lib/gql/nhqlMultipleCover'

    import type { Similarity } from '$lib/models/similarity'

    import CircularProgress from 'svelte-progresscircle'

    import Image from '$lib/atoms/image.svelte'

    interface SimilarityCover extends NhqlCoverPreview {
        similarity: number
    }

    let sources: SimilarityCover[] = null
    let isError = false

    const findSourceById = async (id: number) => {
        try {
            const similars: Similarity[] = await fetch(
                `https://rosmontis.hifumin.app/h/${id}/1`
            ).then((res) => res.json())

            const similarsId = similars.filter(
                ({ similarity }) => +similarity > 65
            )

            const covers = await nhqlMultipleCoverById(
                similarsId
                    .filter(({ similarity }) => +similarity > 65)
                    .map(({ id }) => id)
            )

            sources = covers
                .filter(({ success }) => success)
                .map(({ data }, index) => ({
                    ...data,
                    similarity: +similarsId[index].similarity
                }))
        } catch (error) {
            isError = true
        }
    }

    $: id = +$page.params.id
    $: if (!isServer && id && !isNaN(id)) findSourceById(id)
</script>

{#if isError}
    <main
        class="flex flex-col justify-center items-center gap-6 w-full min-h-app max-w-xs mx-auto py-8"
    >
        <figure class="max-w-48 w-full pb-[100]">
            <div class="block relative pb-[100%] overflow-hidden">
                <img
                    class="absolute object-contain h-full"
                    src="/assets/images/griseo.webp"
                    alt="Griseo crying"
                />
            </div>
        </figure>
        <h1 class="text-gray-700 dark:text-gray-300 text-2xl font-medium">
            Sorry, something went wrong
        </h1>
        <p class="text-gray-500 dark:text-gray-400 text-center">
            We not sure what happend, but your error is now reported to us. We
            are working on it to fix whatever happend here.
        </p>
        <p class="text-gray-500 dark:text-gray-400">
            Sorry for the inconvenience.
        </p>
        <a
            href="/h/{id}"
            class="text-blue-500 bg-blue-50 dark:bg-blue-900/50 text-lg px-6 py-2 rounded-lg"
            sveltekit:prefetch
        >
            Go back
        </a>
    </main>
{:else if sources === null}
    <main
        class="flex flex-col justify-center items-center gap-6 w-full min-h-app max-w-xs mx-auto py-8"
    >
        <figure class="max-w-48 w-full pb-[100]">
            <div class="block relative pb-[100%] overflow-hidden">
                <img
                    class="absolute object-contain h-full"
                    src="/assets/images/griseo.webp"
                    alt="Griseo crying"
                />
            </div>
        </figure>
        <h1 class="text-gray-700 dark:text-gray-300 text-2xl font-medium">
            Finding translation
        </h1>
    </main>
{:else if !sources.length}
    <main
        class="flex flex-col justify-center items-center gap-6 w-full min-h-app max-w-xs mx-auto py-8"
    >
        <figure class="max-w-48 w-full pb-[100]">
            <div class="block relative pb-[100%] overflow-hidden">
                <img
                    class="absolute object-contain h-full"
                    src="/assets/images/griseo.webp"
                    alt="Griseo crying"
                />
            </div>
        </figure>
        <h1 class="text-gray-700 dark:text-gray-300 text-2xl font-medium">
            Not found
        </h1>
        <p class="text-gray-500 dark:text-gray-400 text-center">
            This story doesn't have any translation, yet.
        </p>
        <a
            href="/h/{id}"
            class="text-blue-500 bg-blue-50 dark:bg-blue-900/50 text-lg px-6 py-2 rounded-lg"
            sveltekit:prefetch
        >
            Go back
        </a>
    </main>
{:else}
    <main class="flex flex-col gap-4 w-full max-w-4xl mx-auto py-8">
        <header class="flex py-4">
            <h1 class="text-3xl text-gray-800 dark:text-gray-100">
                Found {sources.length} translation
            </h1>
        </header>
        <section id="sources" class="grid gap-6">
            {#each sources as { id, similarity, title: { display }, images: { cover: { link: src, info: { width, height } } }, metadata: { language }, info: { amount } } (id)}
                <a class="no-underline" href="/h/{id}" sveltekit:prefetch>
                    <article class="flex flex-col gap-2 w-full">
                        <Image
                            {src}
                            {width}
                            {height}
                            alt={display}
                            parentClass="rounded-xl overflow-hidden"
                        />
                        <header
                            class="flex items-center text-lg text-gray-700 dark:text-gray-300"
                        >
                            <h1>{display}</h1>
                            <div
                                class="min-w-9 min-h-9 w-9 h-9 text-sm text-blue-500 font-medium"
                            >
                                <CircularProgress value={~~similarity} />
                            </div>
                        </header>
                        <footer class="flex justify-between items-center">
                            <p
                                class="flex flex-1 items-center gap-1 text-gray-400 capitalize"
                            >
                                <img
                                    class="w-5 h-5"
                                    src="/icons/language.svg"
                                    alt="Language"
                                />
                                {language}
                            </p>
                            <p
                                class="flex flex-1 items-center gap-1 text-gray-400 capitalize"
                            >
                                <img
                                    class="w-4.5 h-4.5"
                                    src="/icons/book-open.svg"
                                    alt="Language"
                                />
                                {amount}
                            </p>
                        </footer>
                    </article>
                </a>
            {/each}
        </section>
    </main>
{/if}

<style lang="sass">
    :root
        --progress-color: theme('colors.blue.500')
        --progress-trackcolor: theme('colors.gray.200')

        &.dark
            --progress-trackcolor: theme('colors.gray.700')

    #sources
        @apply grid
        grid-template-columns: repeat(auto-fill, minmax(135px, 1fr))

    @media (min-width: 568px)
        #sources
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))
</style>
