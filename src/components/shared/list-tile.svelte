<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    export let title = ''
    export let noAction = false

    const dispatch = createEventDispatcher()

    const select = () => {
        dispatch('select')
    }
</script>

{#if noAction}
    <li
        {...$$props}
        class="flex flex-row items-center text-lg text-gray-700 dark:text-gray-200 gap-4 px-6 py-4 bg-white dark:bg-gray-700 {$$props[
            'class'
        ]}"
    >
        <slot name="leading" />
        <div class="flex flex-1">
            {#if title}
                <p>{title}</p>
            {:else}
                <slot name="title" />
            {/if}
        </div>
        <slot name="trailing" />
    </li>
{:else}
    <button
        {...$$props}
        on:click={select}
        class="flex flex-row items-center text-lg text-gray-700 dark:text-gray-200 gap-4 px-6 py-4 bg-white dark:bg-gray-700 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-600 dark:focus:bg-gray-600 transition-colors {$$props[
            'class'
        ]}"
    >
        <slot name="leading" />
        <div class="flex flex-1">
            {#if title}
                <p>{title}</p>
            {:else}
                <slot name="title" />
            {/if}
        </div>
        <slot name="trailing" />
    </button>
{/if}
