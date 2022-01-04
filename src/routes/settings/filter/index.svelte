<script lang="ts">
    import settings from '$lib/stores/settings'

    import SettingLayout from '$lib/layouts/settings.svelte'

    import Toggle from '$lib/atoms/toggle.svelte'
    import Textfield from '$lib/atoms/textfield.svelte'
    import Chip from '$lib/atoms/chip.svelte'
    import SettingRow from '$lib/layouts/setting-row.svelte'

    const addFilter = (value: string) => {
        settings.update((v) => ({
            ...v,
            filter: {
                ...v.filter,
                data: [...new Set(v.filter.data).add(value)]
            }
        }))
    }

    const removeFilter = (value: string) => {
        const data = new Set($settings.filter.data)
        data.delete(value)

        settings.update((v) => ({
            ...v,
            filter: {
                ...v.filter,
                data: [...data]
            }
        }))
    }

    $: disabled = !$settings.filter.enable
    $: disabledClass = disabled ? 'opacity-50 pointer-events-none' : ''
</script>

<SettingLayout
    title="Filter"
    label="Remove unwanted tags or keyword from search results."
>
    <SettingRow row title="Enable">
        <svelte:fragment slot="label">
            <p>Allow custom filter.</p>
            <p>Disable this will not removed filter you have added.</p>
        </svelte:fragment>
        <Toggle class="mt-10" bind:value={$settings.filter.enable} />
    </SettingRow>

    <article class="flex flex-col w-full gap-4 text-gray-500 {disabledClass}">
        <h3 class="text-2xl font-semibold text-gray-700 dark:text-gray-400">
            My filters
        </h3>
        <p>Type down tags you want to filter out from search down here.</p>
        <Textfield
            id="filter"
            name="filter"
            label="My filter"
            placeholder="To exclude"
            onChange={addFilter}
            {disabled}
        />

        <section class="flex gap-1.5 flex-wrap w-full">
            {#each $settings.filter.data as filter}
                <Chip value={filter} onRemove={removeFilter} {disabled} />
            {/each}
        </section>
    </article>
</SettingLayout>
