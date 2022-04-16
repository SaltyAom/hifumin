<script lang="ts">
    export let close: () => void
</script>

<div
    class="fixed top-0 left-0 z-60 flex justify-center items-center w-full h-screen p-4 bg-black/40"
>
    <style lang="sass">
    body
        @apply overflow-hidden
    </style>

    <section
        class="flex flex-col w-full max-w-sm bg-white dark:bg-gray-800 p-4 rounded-lg text-gray-400 dark:text-gray-400 text-lg gap-2"
    >
        <h1 class="px-2 text-gray-700 dark:text-gray-200 text-2xl font-medium">
            Member only feature
        </h1>

        <p class="px-2">
            Account is require to sync data across all of your device
        </p>
        <p class="px-2">To use this feature, sign in to your account.</p>

        <div class="flex flex-row font-medium gap-3 text-xl">
            <button
                class="flex flex-1 justify-center text-blue-500 p-3"
                on:click={close}
            >
                No thanks
            </button>
            <a
                href="/signin"
                class="flex flex-1 justify-center bg-blue-500 dark:bg-blue-600 text-white font-medium p-3 rounded-lg"
            >
                Sign In
            </a>
        </div>
    </section>
</div>
