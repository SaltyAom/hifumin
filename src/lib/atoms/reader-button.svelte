<script lang="ts">
    import settings, { ReaderType } from '$lib/stores/settings'

    export let type: ReaderType
    export let label: string

    $: isActive = $settings.reader === type
    $: active = isActive ? 'text-blue-500 bg-gray-100 dark:bg-gray-700 pr-2' : ''

    const saveType = () => {
        settings.update((v) => ({
            ...v,
            reader: type
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
