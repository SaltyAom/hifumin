<script lang="ts">
    export let value: boolean = false

    $: className = value
        ? 'bg-black boder-black'
        : 'bg-gray-300 border-gray-300'

    $: toggler = value
        ? 'transform translate-x-[29px]'
        : 'transform translate-x-[1px]'

    const toggle = () => {
        value = !value
    }
</script>

<button
    {...$$props}
    class="w-[58px] h-[30px] rounded-full {className} transition-colors {$$props.class}"
    on:click={toggle}
>
    <div class="w-[28px] h-[28px] bg-white rounded-full {toggler} transition-transform" />
</button>
