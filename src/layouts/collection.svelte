<script lang="ts">
    import { SkeletonCover } from "@skeletons"

    export let loading = false
</script>

<main
    {...$$props}
    class="flex flex-col gap-4 w-full max-w-5xl mx-auto px-4 py-4 md:py-8 text-gray-700 dark:text-gray-300 {$$props.class}"
>
    <slot name="header" />

    <slot name="outer" />

    <section class="relative grid collection w-full gap-6 md:gap-8">
        {#if loading}
            {#each Array(25).fill(null) as _}
                <SkeletonCover />
            {/each}
        {:else}
            <slot />
        {/if}
    </section>
</main>

<style lang="sass">
    .collection
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))

        @screen sm
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))

</style>