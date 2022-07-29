<script lang="ts">
    import { relatedById, type Cover as CoverData } from '@gql'
    import { Cover } from '@shared'
    import { SkeletonCover } from '@skeletons'
    import { intersect } from '@services'

    export let id: number

    let related: CoverData[] | null

    $: {
        id

        related = null
    }

    const loadRelated = async () => {
        related = await relatedById(id)
    }
</script>

<footer id="related">
    <h4 class="text-2xl text-left text-gray-700 dark:text-gray-200 md:text-center">You might also like</h4>
    {#if related}
        <div class="stories">
            {#each related as hentai (hentai.id)}
                <Cover {hentai} />
            {/each}
        </div>
    {:else}
        <div class="stories" use:intersect on:intersect={loadRelated}>
            <SkeletonCover />
            <SkeletonCover />
            <SkeletonCover />
            <SkeletonCover />
            <SkeletonCover />
        </div>
    {/if}
</footer>

<style lang="sass">
    #related
        @apply flex flex-col max-w-6xl w-full mx-auto mt-6 mb-12 px-4

        & > .stories
            @apply grid gap-4 py-6
            grid-template-columns: repeat(auto-fill, minmax(155px, 1fr))

            @screen lg
                grid-template-columns: repeat(auto-fill, minmax(170px, 1fr))

            @screen xl
                grid-template-columns: repeat(auto-fill, minmax(185px, 1fr))
</style>
