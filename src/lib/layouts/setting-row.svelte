<script lang="ts">
    export let title: string
</script>

<article class="flex justify-between w-full gap-2 {$$props.class}">
    <header class="flex flex-col text-lg text-gray-500 gap-2">
        <h3 class="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            {title}
        </h3>
        <slot name="label" />
    </header>
    <slot />
</article>
