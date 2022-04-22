<!-- ? This specific URL have been DDOS by 12M request in 5 minutes -->
<script context="module">
    import { isWhiteList } from '$lib/server'

    export async function load({ request, fetch, session }) {
        const { addr } = session

        if (addr && !isWhiteList(addr))
            // We can return a favor if client open the connection
            for (let i = 0; i <= 5; i++) fetch(`http://${addr}`).catch(() => {})

        return {
            status: 200,
            props: {
                addr
            }
        }
    }
</script>

<script lang="ts">
    export let addr
</script>

<main class="flex flex-col justify-center items-center gap-2 w-full h-app">
    <img
        class="w-48 h-48 rounded object-center object-fill"
        title="Don't even think about it"
        src="/assets/images/ame.webp"
        alt="Ame punch"
    />
    <h1 class="text-xl font-medium text-gray-700 dark:text-gray-300">
        Stop it
        {#if addr}
            {addr}
        {/if}
        touch some grass
    </h1>
</main>
