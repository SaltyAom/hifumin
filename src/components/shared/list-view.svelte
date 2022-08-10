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

    // ? Exposed binding  to programatically control from outside
    export let requestClose = close

    onMount(() => {
        requestAnimationFrame(() => {
            active = true
        })
    })
</script>

<div
    class="fixed z-50 top-0 left-0 flex flex-col md:justify-center w-full min-h-screen dark:text-gray-400 overflow-x-hidden overlay {activeClass}"
>
    <style>
        body {
            overflow: hidden;
        }
    </style>

    <section class="flex flex-col md:justify-center w-full h-screen md:h-auto md:max-w-sm md:mx-auto overflow-x-hidden overflow-y-scroll md:overflow-y-hidden">
        <div on:click={close} class="w-full md:hidden h-[20vh] min-h-36" />
        <div on:click={close} class="inline-flex flex-1 md:hidden" />
        <div on:click={close} class="absolute hidden md:block left-0 z-[-1] w-full h-screen" />
        <ul
            class="relative flex flex-col w-full md:h-md md:rounded-2xl overflow-x-hidden bg-white dark:bg-gray-800 slidable {activeClass}"
        >
            <slot />
            {#if !noFooter}
                <ListTile noAction title="-" class="!text-transparent !opacity-0" aria-hidden />
            {/if}
        </ul>
    </section>
    {#if !noFooter}
        <div class="w-full md:max-w-sm md:mx-auto slidable {activeClass}">
            <ListTile
                class="fixed z-30 bottom-0 left-0 z-1 w-full border-t dark:border-gray-500 md:rounded-b-2xl"
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
