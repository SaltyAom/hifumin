<script lang="ts">
    export let title = 'Not Found'
    export let detail = 'Try search with another tag?'
    export let action = 'or Reload?'

    const reload = () => {
        window.location.reload()
    }
</script>

<main class="flex flex-col justify-center items-center gap-3 w-full {$$props.class ?? 'min-h-app'}">
    <div class="w-[12em]">
        <a
            class="relative block w-[12em] pb-[120%] mx-app"
            href="https://walfiegif.wordpress.com/2021/01/13/tap-tap"
        >
            <img
                class="absolute w-full"
                src="/gif/ame-report.webp"
                alt="Ame touching report illustrated by Walfie"
            />
        </a>
    </div>
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
