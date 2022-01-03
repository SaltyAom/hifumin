<script lang="ts">
    import { PlusIcon } from 'svelte-feather-icons'

    export let id: string
    export let label: string
    export let name: string
    export let placeholder: string
    export let onChange: (value: string) => void = () => {}
    export let disabled = false

    let value = ''

    const handleChange = () => {
        if (!value.trim()) return

        onChange(value)

        value = ''
    }
</script>

<form
    class="flex flex-col gap-1"
    on:submit|preventDefault={handleChange}
    aria-disabled={disabled}
>
    <label class="text-gray-400 text-xs" for={id}>{label}</label>
    <div class="flex flex-row max-w-xs w-full px-2 bg-gray-100 rounded">
        <input
            {...$$props}
            {id}
            {name}
            type="text"
            class="text-lg text-gray-700 bg-transparent w-full px-2 py-2 outline-none"
            {placeholder}
            bind:value
        />
        <button
            class="w-12 h-12 p-2.5"
            disabled={disabled}
            tabindex={disabled ? -1 : 0}
        >
            <PlusIcon />
        </button>
    </div>
</form>
