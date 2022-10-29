<script lang="ts">
    import { commentById, type Comment as CommentData } from '@gql'
    import { Comment, Dropdown } from '@shared'
    import { SkeletonComment } from '@skeletons'
    import { intersect } from '@services'
    import { ArrowUpIcon } from 'svelte-feather-icons'

    export let id: number

    let comments: CommentData[] | null = null
    let allLoaded = false
    let batch = 1
    let total = 0
    let isLoading = false

    const loadComment = async () => {
        if (allLoaded || isLoading) return

        isLoading = true

        const response = await commentById({ id, batch, orderBy })

        if (!response.comments || !response?.comments.data.length)
            allLoaded = true

        if (!total) total = response?.comments.total

        comments = [...(comments || []), ...response?.comments.data] || []
        batch++
        isLoading = false

        if (comments.length === total) allLoaded = true
    }

    let labels = ['Newest', 'Oldest']
    let options = labels.map((label) => label.toUpperCase())
    let orderBy = options[0]

    $: {
        id

        allLoaded = false
        batch = 1
        comments = null
    }

    const loadCommentFromOrderBy = () => {
        if (!comments) return

        allLoaded = false
        batch = 1
        comments = null

        loadComment()
    }

    $: {
        orderBy

        loadCommentFromOrderBy()
    }
</script>

<footer
    id="comment"
    class="flex flex-col items-start gap-5 w-full max-w-2xl mx-auto px-4 lg:px-0 pb-8 overflow-x-hidden"
>
    <a 
        class="flex items-center gap-2 text-gray-400 dark:text-gray-500 font-light text-base"
        href="#cover"
    >
        <ArrowUpIcon size="21" strokeWidth={1.5} />
        Back to top
    </a>
    {#if comments}
        <section class="flex justify-between items-center w-full mb-2">
            <h4 class="flex items-center gap-6 text-xl text-gray-700 dark:text-gray-200">
                {Intl.NumberFormat().format(total)} comments
            </h4>
            <Dropdown
                style="width:12ch"
                selectorClass="bg-transparent !text-sm !font-normal !text-gray-400 !px-3 !py-1"
                {options}
                {labels}
                bind:value={orderBy}
            />
        </section>
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
        <section class="flex justify-between items-center w-full mb-2">
            <h4 
                class="w-36 h-8 bg-gray-100 dark:bg-gray-700 rounded"
                use:intersect 
                on:intersect={loadComment} 
            />
            <div class="w-36 h-8 bg-gray-100 dark:bg-gray-700 rounded" />
        </section>

        {#each Array(10).fill(0) as _, index (index)}
            <SkeletonComment />
        {/each}
    {/if}
</footer>

<style lang="sass">
    #comment
        scroll-margin-top: 5.5em
</style>
