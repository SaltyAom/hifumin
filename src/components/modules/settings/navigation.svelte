<script lang="ts">
    import { ChevronRightIcon } from 'svelte-feather-icons'

    export let title: string
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a
    {...$$props}
    class="flex justify-between items-center w-full gap-2 rounded {$$props.class}"
>
    <header class="flex flex-col text-lg text-gray-400 gap-2">
        <h3 class="text-2xl font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
        <slot />
    </header>
    <ChevronRightIcon class="text-gray-400 w-8 h-8" />
</a>
