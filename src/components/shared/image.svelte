<script lang="ts">
    import { settings, SafeMode } from '@stores'
    import { intersect } from '@services'

    import { RefreshCwIcon } from 'svelte-feather-icons'

    export let intersected = false

    export let width: number
    export let height: number
    export let parentClass: string = ''
    export let autoReload = false
    export let src: string
    export let autoCrop = false

    let error = false

    let { width: _w, height: _h, id = '', ...props } = $$props

    let className = $$props['class'] || ''

    const handleIntersection = () => {
        intersected = true
    }

    const handleError = () => {
        error = true

        if (autoReload)
            setTimeout(() => {
                error = false
            }, 500)
    }

    const reloadImage = () => {
        error = false
    }

    const safeModeMap: Record<SafeMode, string> = {
        [SafeMode.off]: '',
        [SafeMode.blur]: 'blur-2xl',
        [SafeMode.opaque]: 'opacity-0'
    }

    const calculatePadding = (width: number, height: number) => {
        const size = (height / width) * 100

        if (autoCrop && size > 175) return 175

        return size
    }

    // ? Add param to make it reactive
    $: padding = calculatePadding(width, height)

    $: safeModeClass = safeModeMap[$settings.safeMode]
</script>

<figure
    use:intersect
    on:intersect={handleIntersection}
    style="padding-bottom:{padding}%"
    class={`relative bg-gray-50 dark:bg-gray-700 overflow-hidden ${parentClass}`}
    {id}
>
    {#if intersected}
        {#if error}
            <button
                {...props}
                {src}
                class="absolute flex flex-col justify-center items-center gap-2 w-full h-full text-gray-500 {className}"
                on:click={reloadImage}
            >
                <RefreshCwIcon class="w-6 h-6" strokeWidth={1} />
                <p class="text-sm font-light">Reload</p>
            </button>
        {:else if $settings.safeMode !== SafeMode.opaque}
            <img
                {...props}
                {src}
                class="absolute w-full h-full {className} {safeModeClass}"
                on:error={handleError}
                alt={$$props.alt || ''}
            />
        {/if}
    {/if}
</figure>
