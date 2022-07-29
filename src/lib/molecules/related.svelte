<script lang="ts">
    import SkeletonCover from '$lib/skeletons/cover.svelte'

    import intersect from '$lib/use/intersect'
    import getRelatedHentai, { type RelatedHentaiData } from '$lib/gql/related'

    import Cover from '$lib/atoms/cover.svelte'

    export let id: number

    let related: RelatedHentaiData[] | null

    $: {
        id

        related = null
    }

    const loadRelated = async () => {
        related = await getRelatedHentai(id)
    }
</script>

<footer id="related">
    <h4 class="label">You might also like</h4>
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

        & > .label
            @apply text-2xl text-left text-gray-700 dark:text-gray-200

            @screen md
                @apply text-center

        & > .stories
            @apply grid gap-4 py-6
            grid-template-columns: repeat(auto-fill, minmax(155px, 1fr))

            @screen lg
                grid-template-columns: repeat(auto-fill, minmax(170px, 1fr))

            @screen xl
                grid-template-columns: repeat(auto-fill, minmax(185px, 1fr))
</style>
