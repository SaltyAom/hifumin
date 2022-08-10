<script lang="ts">
    import { PlusIcon } from 'svelte-feather-icons'

    export let name: string
    export let id = name
    export let label: string
    export let placeholder: string
    export let onChange: (value: string) => void = () => {}
    export let disabled = false
    export let noLeading = false
    export let inputElement: HTMLInputElement = null
    export let containerClass = ''

    export let value = ''

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
    <div
        class="flex flex-row w-full px-2 bg-gray-100 dark:bg-gray-700 rounded-lg {containerClass}"
    >
        <input
            {...$$props}
            {id}
            {name}
            type="text"
            class="text-lg text-gray-700 dark:text-gray-300 bg-transparent w-full px-2 py-2 outline-none"
            {placeholder}
            bind:value
            bind:this={inputElement}
        />
        {#if !noLeading}
            <button
                class="w-12 h-12 p-2.5"
                {disabled}
                tabindex={disabled ? -1 : 0}
            >
                <PlusIcon />
            </button>
        {/if}
    </div>
</form>
