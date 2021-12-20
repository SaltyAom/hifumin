<script lang="ts">
    import intersect from '$lib/use/intersect'

    export let intersected = false

    export let size: [number, number]
    export let parentClass: string = ''
    
    let [width, height] = size
    let className = $$props['class'] || ''


    const handleIntersection = () => {
        intersected = true
    }
</script>

<figure
    use:intersect
    on:intersect={handleIntersection}
    style="padding-bottom:{height/width * 100}%"
    class={`relative bg-gray-50 overflow-hidden ${parentClass}`}
>
    {#if intersected}
        <img {...$$props} class={`absolute w-full h-full ${className}`} />
    {/if}
</figure>
