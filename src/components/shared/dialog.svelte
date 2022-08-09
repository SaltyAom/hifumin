<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte'

    export let title = ''
    export let action = 'Ok'

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
        class="z-1 flex flex-col w-full max-w-sm p-6 bg-white rounded-2xl gap-4"
    >
        {#if title}
            <h2
                class="text-gray-700 text-2xl font-medium mb-2 ${$$props[
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
                class="text-gray-500 hover:bg-gray-100 focus:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
                on:click={close}
            >
                Cancel
            </button>
            <button
                class="text-blue-500 bg-blue-50 font-medium px-4 py-2 rounded-lg"
                on:click={handleAction}
            >
                {action}
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
