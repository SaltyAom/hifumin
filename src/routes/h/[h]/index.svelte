<script context="module" lang="ts">
    import nhqlById from '$lib/gql/nhqlById'
    import type { NhqlByIdData } from '$lib/gql/nhqlById'

    import Image from '$lib/atoms/image.svelte'

    export async function load({ params }) {
        const { h } = params

        const t = performance.now()
        const nhql = await nhqlById(+h)

        if (!nhql)
            return {
                status: 404
            }

        return {
            cache: {
                maxage: 3600,
                private: true
            },
            props: {
                h,
                nhql
            }
        }
    }
</script>

<script lang="ts">
    import settings, { ReaderType } from '$lib/stores/settings'

    import ReaderHeader from '$lib/atoms/reader-header.svelte'
    import ReaderMode from '$lib/molecules/reader-mode.svelte'

    import Comment from '$lib/organisms/comment.svelte'
    import OpenGraph from '$lib/atoms/open-graph.svelte'

    export let nhql: NhqlByIdData
    export let h: number

    const reload: svelte.JSX.EventHandler<Event, HTMLImageElement> = (
        event
    ) => {
        const image = event.target as HTMLImageElement
        const src = image.src.toString()

        image.src = ''

        setTimeout(() => {
            image.src = src
        }, 333)
    }

    const getPage = /\/([0-9]{1,4})\.(\w+)$/

    const readerIdMap: Record<ReaderType, string> = {
        [ReaderType.interactive]: 'interactive',
        [ReaderType.scroll]: 'scroll'
    }

    const composePreviewImage = (source: string) => {
        const [, id, extension] = getPage.exec(source)

        return source
            .replace('i.nh', 't.nh')
            .replace(getPage, `/${id}t.${extension}`)
    }

    let tags = nhql.metadata.tags.map(({ name }) => name).join(', ')
</script>

<OpenGraph
    id={h}
    title="Read: {nhql.title
        .display} &raquo; Hifumin: hentai doujinshi and manga"
    description="[{nhql.metadata.language}] {nhql.title
        .display}, total page: {nhql.info.amount}, favorite {nhql.info
        .favorite}, tags: {tags} &raquo; Read on Hifumin: hentai doujinshi and manga"
    author={nhql.metadata.artists.map((artist) => artist.name).join(', ')}
    image={nhql.images.cover}
    createdAt={nhql.info.upload}
/>

<article class="flex flex-col w-full mx-auto">
    <div
        class="relative flex items-center w-full min-h-app bg-cover bg-center py-4 bg-white dark:bg-gray-800"
    >
        <figure class="absolute w-full h-full overflow-hidden">
            <img
                class="w-full h-full object-cover object-center blur-3xl brightness-60 pointer-events-none no-user-select"
                src={nhql.images.cover.link}
                alt={nhql.title.display}
                on:error={reload}
            />
        </figure>

        <ReaderHeader {nhql} />
    </div>

    <ReaderMode />

    <main id={readerIdMap[$settings.reader]} class="w-full mx-auto pb-8">
        {#if $settings.reader === ReaderType['scroll']}
            {#each nhql.images.pages as { link: src, info: { width, height } }, index (src)}
                <Image
                    {src}
                    {width}
                    {height}
                    id={`page-${index + 1}`}
                    alt={`Page ${index + 1}, ${nhql.title.display}`}
                />
            {/each}
        {:else if $settings.reader === ReaderType['interactive']}
            {#each nhql.images.pages as { link: src, info: { width, height } }, index (src)}
                <a
                    class="cover relative rounded overflow-hidden"
                    href={`/h/${nhql.id}/${index + 1}`}
                >
                    <div
                        class="overlay z-10 absolute flex justify-center items-end w-full h-full text-white text-lg font-medium bg-black bg-opacity-60 pb-3 opacity-0"
                    >
                        <p class="indicator">Page {index + 1}</p>
                    </div>
                    <div class="image">
                        <Image
                            src={composePreviewImage(src)}
                            {width}
                            {height}
                            autoCrop
                            id={`page-${index + 1}`}
                            alt={`Page ${index + 1}, ${nhql.title.display}`}
                            autoReload
                        />
                    </div>
                </a>
            {/each}
        {/if}
    </main>

    <Comment id={nhql.id} />
</article>

<style lang="sass">
    $expo-out: cubic-bezier(.16,1,.3,1)

    #interactive
        @apply grid max-w-6xl gap-4 px-2
        grid-template-columns: repeat(auto-fill, minmax(135px, 1fr))

    #scroll
        @apply flex flex-col max-w-2xl

    .cover
        .overlay
            transition: opacity .2s $expo-out

            .indicator
                transform: translateY(24px)
                transition: transform .2s $expo-out

        .image
            transition: transform .2s $expo-out

        &:hover,
        &:focus
            .overlay
                @apply opacity-100

                .indicator
                    transform: translateY(0)

            .image
                transform: scale(1.1)

    @media (min-width: 568px)
        #interactive
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))
</style>
