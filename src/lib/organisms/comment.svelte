<script lang="ts">
    import Comment from '$lib/atoms/comment.svelte'
    import SkeletonComment from '$lib/skeletons/comment.svelte'

    import intersect from '$lib/use/intersect'

    import nhqlComment from '$lib/gql/nhqlComment'
    import type { Comment as IComment } from '$lib/gql/nhqlComment'

    export let id: number

    let comments: IComment[] | null = null
    let allLoaded = false
    let batch = 1
    let total = 0

    const loadComment = async () => {
        if (allLoaded) return

        const response = await nhqlComment({ id, batch })

        if (!response.comments || !response?.comments.data.length)
            allLoaded = true

        total = response?.comments.total

        comments = [...(comments || []), ...response?.comments.data] || []
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
    class="flex flex-col gap-5 w-full max-w-2xl mx-auto px-4 lg:px-0 py-8 border-t dark:border-gray-600"
>
    {#if comments}
        <h4 class="text-xl text-gray-700 dark:text-gray-200 mb-2">
            {Intl.NumberFormat().format(total)} comments
        </h4>
        {#each comments as comment (comment.created)}
            <Comment {comment} />
        {/each}
        {#if !allLoaded}
            <div
                class="opacity-0 h-1"
                use:intersect={{
                    loop: !allLoaded,
                    onIntersect: loadComment
                }}
            />
            {#each Array(4).fill(0) as _, index (index)}
                <SkeletonComment />
            {/each}
        {/if}
    {:else}
        <div use:intersect on:intersect={loadComment} />

        <div class="w-36 h-6 mb-3 bg-gray-100 dark:bg-gray-700 rounded" />
        {#each Array(10).fill(0) as _, index (index)}
            <SkeletonComment />
        {/each}
    {/if}
</footer>
