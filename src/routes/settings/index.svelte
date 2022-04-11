<script>
    import settings, { SafeMode, Theme, ReaderType } from '$lib/stores/settings'

    import SettingLayout from '$lib/layouts/settings.svelte'
    import SettingRow from '$lib/layouts/setting-row.svelte'
    import SettingNavigation from '$lib/layouts/setting-navigation.svelte'

    import Dropdown from '$lib/atoms/dropdown.svelte'
</script>

<SettingLayout title="Settings" label="Adjust Platform behavior">
    <SettingRow vertical title="Theme Mode">
        <svelte:fragment slot="label">
            <p>Set color theme.</p>
            <p>Choosing "adaptive" will use the system setting.</p>
        </svelte:fragment>
        <Dropdown
            class="mt-7"
            options={[Theme.adaptive, Theme.light, Theme.dark]}
            labels={['adaptive', 'light', 'dark']}
            bind:value={$settings.theme}
        />
    </SettingRow>

    <SettingRow vertical title="Safe Mode">
        <p slot="label">Hide the image for some purpose.</p>
        <Dropdown
            class="mt-3.5"
            options={[SafeMode.off, SafeMode.blur, SafeMode.opaque]}
            labels={['Off', 'Blur', 'Opaque']}
            bind:value={$settings.safeMode}
        />
    </SettingRow>

    <SettingRow vertical title="Reader Mode">
        <p slot="label">Reading Layout</p>
        <Dropdown
            class="mt-3.5"
            options={[ReaderType.scroll, ReaderType.interactive]}
            labels={['Scroll', 'Interactive']}
            bind:value={$settings.reader}
        />
    </SettingRow>

    <SettingNavigation title="Preference" href="/settings/preference">
        <p>Add your own tags preference for finding hentai on discover page.</p>
    </SettingNavigation>

    <SettingNavigation title="Filter" href="/settings/filter">
        <p>Remove unwanted tags or keyword from search results.</p>
    </SettingNavigation>
</SettingLayout>
