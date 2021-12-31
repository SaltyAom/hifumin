<script lang="ts">
    import intersect from '$lib/use/intersect'

    import { RefreshCwIcon } from 'svelte-feather-icons'

    export let intersected = false

    export let width: number
    export let height: number
    export let parentClass: string = ''
    export let autoReload = false
    export let src: string

    let error = false

    let { width: _w, height: _h, ...props } = $$props

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
</script>

<figure
    use:intersect
    on:intersect={handleIntersection}
    style="padding-bottom:{(height / width) * 100}%"
    class={`relative bg-gray-50 overflow-hidden ${parentClass}`}
>
    {#if intersected}
        {#if error}
            <button
                {...props}
                {src}
                class={`absolute flex flex-col justify-center items-center gap-2 w-full h-full text-gray-500 ${className}`}
                on:click={reloadImage}
            >
                <RefreshCwIcon class="w-6 h-6" strokeWidth={1} />
                <p class="text-sm font-light">Reload</p>
            </button>
        {:else}
            <img
                {...props}
                {src}
                class={`absolute w-full h-full ${className}`}
                on:error={handleError}
                alt={$$props.alt || ''}
            />
        {/if}
    {/if}
</figure>
