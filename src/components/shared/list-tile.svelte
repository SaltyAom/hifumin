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
        class="flex flex-row items-center text-lg text-gray-700 gap-4 px-6 py-4 bg-white {$$props[
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
        class="flex flex-row items-center text-lg text-gray-700 gap-4 px-6 py-4 bg-white hover:bg-gray-100 focus:bg-gray-100 transition-colors {$$props[
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
