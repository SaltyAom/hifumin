<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte'

    export let title = ''
    export let action = 'Ok'
    export let actionClass = ''

    let active = false
    $: activeClass = active ? '-active' : ''

    const dispatch = createEventDispatcher()

    onMount(() => {
        requestAnimationFrame(() => {
            active = true
        })
    })

    export let close = () => {
        active = false

        dispatch('close')
    }

    const handleAction = () => {
        dispatch('action', {
            close
        })
    }
</script>

<div
    class="fixed z-50 top-0 left-0 flex justify-center items-center w-full h-screen px-4 overlay {activeClass}"
>
    <style>
        body {
            overflow: hidden;
        }
    </style>

    <div
        class="absolute top-0 left-0 w-full h-screen bg-black/50"
        on:click={close}
    />

    <section
        role="dialog"
        open
        {...$$props}
        class="z-1 flex flex-col w-full max-w-sm text-gray-500 dark:text-gray-400 pt-6 pl-6 pb-4 pr-4 bg-white dark:bg-gray-700 rounded-2xl gap-4"
    >
        {#if title}
            <h2
                class="text-gray-700 dark:text-gray-300 text-2xl font-medium ${$$props[
                    'class'
                ]}"
            >
                {title}
            </h2>
        {:else}
            <slot />
        {/if}

        <slot />

        <footer class="flex justify-end items-center gap-2 mt-2">
            <button
                class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-600 dark:focus:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                on:click={close}
            >
                Cancel
            </button>
            <button
                class="text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/15 font-medium px-4 py-2 rounded-lg {actionClass}"
                on:click={handleAction}
            >
                {#if $$slots['action']}
                    <slot name="action" />
                {:else}
                    {action}
                {/if}
            </button>
        </footer>
    </section>
</div>

<style lang="sass">
    $ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)

    .overlay
        @apply opacity-0
        transition: opacity .25s $ease-out-expo

        &.-active
            @apply opacity-100
</style>
