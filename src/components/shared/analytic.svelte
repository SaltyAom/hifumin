<script lang="ts">
    import { page } from '$app/stores'
    import { browser, dev } from '$app/environment'

    import { onMount } from 'svelte'
    import { partytownSnippet } from '@builder.io/partytown/integration'

    let scriptEl

    if (!dev)
        onMount(() => scriptEl && (scriptEl.textContent = partytownSnippet()))
</script>

<svelte:head>
    <script>
        partytown = {
            forward: ['dataLayer.push']
        }
    </script>
    <script bind:this={scriptEl}></script>

    <script
        async
        type="text/partytown"
        src="https://www.googletagmanager.com/gtag/js"></script>
    <script type="text/partytown">
        window.dataLayer = window.dataLayer || []

        function gtag() {
            dataLayer.push(arguments)
        }

        gtag('js', new Date())
        gtag('config', 'G-3P8K1JLFMV', {
            page_path: window.location.pathname
        })
    </script>
</svelte:head>
