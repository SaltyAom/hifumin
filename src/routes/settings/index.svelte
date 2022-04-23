<script lang="ts">
    import settings, { SafeMode, Theme, ReaderType } from '$lib/stores/settings'

    import SettingLayout from '$lib/layouts/settings.svelte'
    import SettingRow from '$lib/layouts/setting-row.svelte'
    import SettingNavigation from '$lib/layouts/setting-navigation.svelte'

    import Dropdown from '$lib/atoms/dropdown.svelte'

    import { isServer } from '$lib/utils'

    const cacheKeys = isServer
        ? []
        : Object.keys(localStorage).filter((key) => key.startsWith('_gqc_'))

    // ? @saltyaom/gql-local-cache contains value and expires
    const totalCache = cacheKeys.length / 2
    const totalCacheSize = cacheKeys.reduce((acc, key) => {
        return localStorage.getItem(key).length + acc
    }, 0)

    const clearCache = () => {
        if (isServer) return

        cacheKeys.forEach((key) => {
            localStorage.removeItem(key)
        })

        window.location.reload()
    }
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

    <SettingRow vertical title="Clear Cache">
        <svelte:fragment slot="label">
            <p>Clear search data and hentai cache.</p>
            <p>
                Each cache will remove itself every 3 hours. So no need to
                remove manually except for really wanted to clear the cache.
            </p>
            <p>Cache: {(totalCacheSize / (1024 * 1024)).toFixed(3)} MB</p>
        </svelte:fragment>
        <div class="flex items-center min-w-36 my-4">
            <button
                class=" text-red-500 dark:text-red-600 font-medium whitespace-normal px-4 py-2 bg-red-50 dark:bg-red-900/40 rounded-lg"
                on:click={clearCache}
            >
                Clear Cache
            </button>
        </div>
    </SettingRow>
</SettingLayout>
