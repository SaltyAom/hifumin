<script lang="ts">
    export let title: string
    export let vertical = false
</script>

<article
    class="flex {!vertical
        ? 'flex-row'
        : 'flex-col'} md:flex-row justify-between w-full md:gap-2 {$$props.class}"
>
    <header class="flex flex-col text-lg text-gray-500 gap-2">
        <h3 class="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            {title}
        </h3>
        <slot name="label" />
    </header>
    <slot />
</article>
