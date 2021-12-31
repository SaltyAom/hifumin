<script lang="ts">
    import controller from '$lib/stores/controller'
    import type { ReaderType } from '$lib/stores/controller'

    export let type: ReaderType
    export let label: string

    $: isActive = $controller.type === type
    $: active = isActive ? 'text-blue-500 bg-gray-100 pr-2' : ''

    const saveType = () => {
        controller.update((v) => ({
            ...v,
            type
        }))
    }
</script>

<button
    class={`flex gap-0.5 h-8 p-1 rounded-lg ${active}`}
    on:click={saveType}
    title={label}
>
    <slot />
    {#if isActive}
        {label}
    {/if}
</button>
