<script>
    import { onMount } from 'svelte'
    import { createEventDispatcher } from 'svelte'
    import { CheckIcon } from 'svelte-feather-icons'
    import ListTile from './list-tile.svelte'

    export let noFooter = false

    let active = false
    $: activeClass = active ? '-active' : ''

    const dispatch = createEventDispatcher()

    const close = () => {
        active = false

        setTimeout(() => {
            dispatch('close')
            // ? 200 (animation time) + 33 (2 frames on 60fps)
        }, 233)
    }

    export let requestClose = close

    onMount(() => {
        requestAnimationFrame(() => {
            active = true
        })
    })
</script>

<div
    class="fixed z-50 top-0 left-0 dark:text-gray-400 w-full min-h-screen overflow-x-hidden overlay {activeClass}"
>
    <style>
        body {
            overflow: hidden;
        }
    </style>

    <section class="flex flex-col h-screen overflow-x-hidden overflow-y-scroll">
        <div on:click={close} class="w-full h-[20vh] min-h-36" />
        <div on:click={close} class="inline-flex flex-1" />
        <ul
            class="relative flex flex-col w-full bg-white slidable {activeClass}"
        >
            <slot />
            {#if !noFooter}
                <ListTile title="-" class="text-transparent" aria-hidden />
            {/if}
        </ul>
    </section>
    {#if !noFooter}
        <div class="slidable {activeClass}">
            <ListTile
                class="fixed bottom-0 left-0 z-1 w-full border-t"
                title="Done"
                on:select={close}
            >
                <CheckIcon slot="leading" size="24" />
            </ListTile>
        </div>
    {/if}
</div>

<style lang="sass">
    $ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)

    .overlay
        transition: background-color .25s $ease-out-expo

        &.-active
            @apply bg-black/50

    .slidable
        transform: translateY(100vh)
        transition: transform .25s $ease-out-expo

        &.-active
            transform: translateY(0)
</style>
