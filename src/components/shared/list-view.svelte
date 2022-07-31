<script>
    import { onMount } from 'svelte'
    import { createEventDispatcher } from 'svelte'
    import { CheckIcon } from 'svelte-feather-icons'
    import ListTile from './list-tile.svelte'

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
            <ListTile title="-" class="text-transparent" aria-hidden />
        </ul>
    </section>
    <div class="slidable {activeClass}">
        <ListTile
            class="fixed bottom-0 left-0 z-1 w-full border-t"
            title="Done"
            on:select={close}
        >
            <CheckIcon slot="leading" size="24" />
        </ListTile>
    </div>
</div>

<style lang="sass">
    .overlay
        transition: background-color .2s ease-in

        &.-active
            @apply bg-black/50

    .slidable
        transform: translateY(100vh)
        transition: transform .2s ease-out

        &.-active
            transform: translateY(0)
</style>
