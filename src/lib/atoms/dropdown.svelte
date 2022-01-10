<script lang="ts">
    import { ChevronDownIcon } from 'svelte-feather-icons'

    export let options: Array<string | number>
    export let value = options[0]
    export let labels: string[] | null = null
    export let selectorClass = ''

    let isOpen = false
    let focus = 0

    let selector: HTMLElement
    let optionCard: HTMLElement

    $: selectedIndex = options.indexOf(value)
    $: activeClass = (option: string | number) =>
        value === option
            ? 'text-gray-300 dark:text-gray-500'
            : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-600 dark:focus:bg-gray-600'

    const open = () => {
        isOpen = true

        focusFirst()
    }

    const close = () => {
        isOpen = false

        selector.focus()
    }

    const select = (option: string | number) => () => {
        value = option

        close()
    }

    const focusOption = (index: number) => {
        const button = optionCard.children[index] as HTMLButtonElement | null
        button?.focus()
    }

    const registerFocus = (index: number) => () => {
        focusOption(index)
    }

    const focusFirst = () => {
        const index = options.indexOf(value) === 0 ? 1 : 0

        const button = optionCard.children[index] as HTMLButtonElement | null
        focus = index
        button.focus()
    }

    const handleKeyDown = ({ key }: KeyboardEvent) => {
        if (key === 'Escape') return close()

        if (key === 'ArrowUp') {
            if (focus > 0) focus--
            if (focus === selectedIndex)
                if (selectedIndex !== 0) focus--
                else focus = 1
        }

        if (key === 'ArrowDown') {
            if (focus < options.length - 1) focus++
            if (focus === selectedIndex)
                if (selectedIndex !== options.length - 1) focus++
                else focus = options.length - 2
        }

        focusOption(focus)
    }

    $: {
        if (typeof window !== 'undefined') {
            if (isOpen) {
                window.addEventListener('keydown', handleKeyDown, true)
                // document.body.setAttribute('style', 'overflow-y: hidden;')
            } else {
                window.removeEventListener('keydown', handleKeyDown, true)
                // document.body.setAttribute('style', '')
            }
        }
    }
</script>

{#if isOpen}
    <div
        class="fixed top-0 left-0 z-10 w-full h-screen"
        on:click={close}
        aria-hidden
    />
{/if}

<div class="relative w-[16ch] {$$props.class || ''}">
    <button
        class="flex items-center w-full font-bold text-gray-700 dark:text-gray-400 mt-0.5 pl-6 pr-3 py-2.5 bg-gray-100 dark:bg-gray-700 rounded {selectorClass}"
        on:click={open}
        bind:this={selector}
    >
        <p class="flex flex-1 text-lg capitalize">
            {#if labels}
                {labels[selectedIndex]}
            {:else}
                {value}
            {/if}
        </p>
        <ChevronDownIcon class="w-6 h-6" />
    </button>

    <section
        class={`sheet absolute z-20 flex flex-col justify-center w-full mt-1 bg-white dark:bg-gray-700 rounded overflow-hidden ${
            isOpen ? '-open' : ''
        }`}
        style="height:{isOpen ? 8 + options.length * 48 : 0}px"
        aria-hidden={!isOpen}
        bind:this={optionCard}
    >
        {#each options as option, index}
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <button
                class={`option flex items-center w-full h-12 text-lg capitalize px-6 outline-none transition-colors ${activeClass(
                    option
                )}`}
                on:click={select(option)}
                on:mouseover={index !== selectedIndex && registerFocus(index)}
                disabled={index === selectedIndex}
                tabindex={isOpen ? 0 : -1}
                aria-hidden={!isOpen}
            >
                {#if labels}
                    {labels[index]}
                {:else}
                    {option}
                {/if}
            </button>
        {/each}
    </section>
</div>

<style lang="sass">
    $expo-out: cubic-bezier(.16,1,.3,1)

    .option
        min-height: 3rem

    .sheet
        opacity: 0
        transition: height 0.4s $expo-out, box-shadow 0.4s $expo-out, opacity 0.4s $expo-out

        &.-open
            opacity: 1
            box-shadow: 0 4px 16px rgba(66, 39, 39, 0.08), 0 8px 25px rgb(0 0 0 / 8%)
</style>
