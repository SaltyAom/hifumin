<script context="module" lang="ts">
    import nhqlById from '$lib/gql/nhqlById'
    import type { NhqlByIdData } from '$lib/gql/nhqlById'

    import Image from '$lib/atoms/image.svelte'

    export async function load({ page }) {
        const {
            params: { h }
        } = page

        const nhql = await nhqlById(+h)

        if (!nhql) return

        return {
            props: {
                nhql
            }
        }
    }
</script>

<script lang="ts">
    import intersect from '$lib/use/intersect'

    import nhqlComment from '$lib/gql/nhqlComment'
    import type { NhqlCommentData } from '$lib/gql/nhqlComment'

    import ReaderHeader from '$lib/atoms/reader-header.svelte'

    import Comment from '$lib/atoms/comment.svelte'
    import SkeletonComment from '$lib/skeletons/comment.svelte'

    export let nhql: NhqlByIdData

    let comments: NhqlCommentData['comments'] | null = null
    let allLoaded = false
    let batch = 1

    const loadComment = async () => {
        if (allLoaded) return

        const response = await nhqlComment({ id: nhql.id, batch })

        if (!response.comments || !response?.comments.length) allLoaded = true

        comments = [...(comments || []), ...response?.comments] || []
        batch++
    }

    const reload: svelte.JSX.EventHandler<Event, HTMLImageElement> = (
        event
    ) => {
        const image = event.target as HTMLImageElement
        const src = image.src.toString()

        image.src = ''

        setTimeout(() => {
            image.src = src
        }, 500)
    }
</script>

<svelte:head>
    <title>{nhql.title.display} - Opener Lite</title>
</svelte:head>

<article class="flex flex-col w-full mx-auto">
    <div
        class="relative flex items-center w-full min-h-app bg-cover bg-center overflow-hidden py-4 bg-white"
    >
        <img
            class="absolute w-full h-full object-cover object-center blur-3xl brightness-60"
            src={nhql.images.cover.link}
            alt={nhql.title.display}
            on:error={reload}
        />

        <ReaderHeader {nhql} />
    </div>

    <main class="flex flex-col w-full max-w-2xl mx-auto py-8">
        {#each nhql.images.pages as { link: src, info: { width, height } }, index (src)}
            <Image
                {src}
                {width}
                {height}
                alt={`Page ${index + 1}, ${nhql.title.display}`}
            />
        {/each}
    </main>

    <footer
        use:intersect
        on:intersect={loadComment}
        class="flex flex-col gap-5 w-full max-w-2xl mx-auto px-4 lg:px-0 py-8 border-t"
    >
        {#if comments}
            <h4 class="text-xl text-gray-700 mb-2">
                <!-- {comments.length} -->
                {' '}Comments
            </h4>
            {#each comments as comment (comment.created)}
                <Comment {comment} />
            {/each}
            {#if !allLoaded}
                <div
                    class="opacity-0"
                    use:intersect={{
                        loop: true
                    }}
                    on:intersect={loadComment}
                />
                {#each Array(4).fill(0) as _, index (index)}
                    <SkeletonComment />
                {/each}
            {/if}
        {:else}
            <div class="w-36 h-6 mb-3 bg-gray-100 rounded" />
            {#each Array(10).fill(0) as _, index (index)}
                <SkeletonComment />
            {/each}
        {/if}
    </footer>
</article>
