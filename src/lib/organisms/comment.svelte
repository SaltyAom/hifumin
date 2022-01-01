<script lang="ts">
    import Comment from '$lib/atoms/comment.svelte'
    import SkeletonComment from '$lib/skeletons/comment.svelte'

    import intersect from '$lib/use/intersect'

    import nhqlComment from '$lib/gql/nhqlComment'
    import type { NhqlCommentData } from '$lib/gql/nhqlComment'

    export let id: number

    let comments: NhqlCommentData['comments'] | null = null
    let allLoaded = false
    let batch = 1

    const loadComment = async () => {
        if (allLoaded) return

        const response = await nhqlComment({ id, batch })

        if (!response.comments || !response?.comments.length) allLoaded = true

        comments = [...(comments || []), ...response?.comments] || []
        batch++
    }

    $: {
        id

        allLoaded = false
        batch = 1
        comments = null
    }
</script>

<footer
    use:intersect={{
        loop: !allLoaded
    }}
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
