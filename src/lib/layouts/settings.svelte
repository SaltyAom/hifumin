<script lang="ts">
    import { page } from '$app/stores'

    import { ChevronLeftIcon } from 'svelte-feather-icons'

    export let title: string
    export let label = ''
</script>

<section class="flex flex-col w-full max-w-xl mx-auto py-8 px-4">
    {#if $page.url.pathname !== '/settings'}
        <a class="flex items-center gap-0.5 text-gray-400" href="/settings"
            ><ChevronLeftIcon class="w-5 h-5" /> Back</a
        >
    {/if}

    <h1 class="text-4xl text-gray-800 font-semibold pt-8">{title}</h1>
    {#if label}
        <p class="text-lg text-gray-500 mt-3 mb-12">
            {label}
        </p>
    {/if}

    <main class="flex flex-col gap-10 w-full">
        <slot />
    </main>
</section>
