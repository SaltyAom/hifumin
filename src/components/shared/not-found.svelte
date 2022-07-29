<script lang="ts">
    export let title = 'Not Found'
    export let detail = 'Try search with another tag?'
    export let action = 'or Reload?'

    const reload = () => {
        window.location.reload()
    }
</script>

<main
    class="flex flex-col justify-center items-center gap-3 w-full {$$props.class ??
        'min-h-app'}"
>
    <figure class="relative w-48">
        <div class="pb-[100%]">
            <img
                class="absolute w-full"
                src="/assets/images/griseo.webp"
                alt="Griseo crying"
            />
        </div>
    </figure>
    <h1 class="text-gray-700 dark:text-gray-200 text-2xl font-medium">
        {title}
    </h1>
    <p class="text-gray-500 dark:text-gray-400 text-lg text-center">
        {detail}
    </p>
    <button
        class="text-blue-500 bg-blue-50 dark:bg-blue-900/50 px-4 py-2 text-xl font-medium rounded-lg"
        on:click={reload}>{action}</button
    >
</main>
