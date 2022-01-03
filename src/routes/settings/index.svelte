<script>
    import settings, { SafeMode, Theme, ReaderType } from '$lib/stores/settings'

    import SettingLayout from '$lib/layouts/settings.svelte'

    import Dropdown from '$lib/atoms/dropdown.svelte'
    import { ChevronRightIcon } from 'svelte-feather-icons'
</script>

<SettingLayout title="Settings" label="Adjust Platform behavior">
    <article class="flex justify-between w-full gap-2">
        <header class="flex flex-col text-lg text-gray-500 gap-2">
            <h3 class="text-2xl font-semibold text-gray-700">Theme Mode</h3>
            <p>Set color theme.</p>
            <p>Choosing "adaptive" will use the system setting.</p>
        </header>
        <Dropdown
            options={[Theme.adaptive, Theme.light, Theme.dark]}
            labels={['adaptive', 'light', 'dark']}
            bind:value={$settings.theme}
        />
    </article>

    <article class="flex justify-between w-full gap-2">
        <header class="flex flex-col text-lg text-gray-500 gap-2">
            <h3 class="text-2xl font-semibold text-gray-700">Safe Mode</h3>
            <p>Hide the image for some purpose.</p>
        </header>
        <Dropdown
            options={[SafeMode.off, SafeMode.blur, SafeMode.opaque]}
            labels={['Off', 'Blur', 'Opaque']}
            bind:value={$settings.safeMode}
        />
    </article>

    <article class="flex justify-between w-full gap-2">
        <header class="flex flex-col text-lg text-gray-500 gap-2">
            <h3 class="text-2xl font-semibold text-gray-700">Reader Mode</h3>
            <p>Reading Layout</p>
        </header>
        <Dropdown
            options={[ReaderType.scroll, ReaderType.interactive]}
            labels={['Scroll', 'Interactive']}
            bind:value={$settings.reader}
        />
    </article>

    <a
        class="flex justify-between items-center w-full gap-2 rounded"
        href="/settings/preference"
    >
        <header class="flex flex-col text-lg text-gray-500 gap-2">
            <h3 class="text-2xl font-semibold text-gray-700">Preference</h3>
            <p>
                Add your own tags preference for finding hentai on discover
                page.
            </p>
        </header>
        <ChevronRightIcon class="text-gray-400 w-8 h-8" />
    </a>

    <a
        class="flex justify-between items-center w-full gap-2 rounded"
        href="/settings/filter"
    >
        <header class="flex flex-col text-lg text-gray-500 gap-2">
            <h3 class="text-2xl font-semibold text-gray-700">Filter</h3>
            <p>Remove unwanted tags or keyword from search results.</p>
        </header>
        <ChevronRightIcon class="text-gray-400 w-8 h-8" />
    </a>
</SettingLayout>
