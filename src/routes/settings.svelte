<script>
    import Dropdown from '$lib/atoms/dropdown.svelte'

    const options = ['adaptive', 'light', 'dark']
    let value = options[0]
</script>

<section class="flex flex-col w-full max-w-xl mx-auto py-4 px-4">
    <h1 class="text-4xl text-gray-800 font-semibold pt-12">Settings</h1>
    <p class="text-lg text-gray-500 mt-3 mb-12">Adjust Platform behavior</p>

    <main class="flex flex-col gap-10 w-full">
        <article class="flex justify-between w-full gap-2">
            <header class="flex flex-col text-lg text-gray-500 gap-2">
                <h3 class="text-2xl font-semibold text-gray-700">Theme Mode</h3>
                <p>Set color theme.</p>
                <p>Choosing "adaptive" will use the system setting.</p>
            </header>
            <Dropdown options={['adaptive', 'light', 'dark']} bind:value />
        </article>

        <article class="flex justify-between w-full gap-2">
            <header class="flex flex-col text-lg text-gray-500 gap-2">
                <h3 class="text-2xl font-semibold text-gray-700">Safe Mode</h3>
                <p>Hide the image for some purpose.</p>
            </header>
            <Dropdown options={['disable', 'blur', 'opaque']} bind:value />
        </article>
    </main>
</section>
