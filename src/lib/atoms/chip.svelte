<script lang="ts">
    import { XIcon } from 'svelte-feather-icons'

    export let value: string
    export let onRemove: (value: string) => void
    export let disabled = false

    const handleRemove = () => {
        onRemove(value)
    }
</script>

<div
    class="flex items-center text-gray-600 gap-2 pl-3 pr-1 py-1 rounded-full border cursor-default"
>
    {value}
    <button
        class="text-gray-400 p-0.5 rounded-full"
        on:click={handleRemove}
        {disabled}
    >
        <XIcon class="w-5 h-5" />
    </button>
</div>
