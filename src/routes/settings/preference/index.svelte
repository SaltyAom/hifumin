<script lang="ts">
    import settings from '$lib/stores/settings'

    import SettingLayout from '$lib/layouts/settings.svelte'

    import Toggle from '$lib/atoms/toggle.svelte'
    import Textfield from '$lib/atoms/textfield.svelte'
    import Chip from '$lib/atoms/chip.svelte'

    import { tags } from '$lib/data'

    const addPreference = (value: string) => {
        settings.update((v) => ({
            ...v,
            preference: {
                ...v.preference,
                data: [...new Set(v.preference.data).add(value)]
            }
        }))
    }

    const removePreference = (value: string) => {
        const data = new Set($settings.preference.data)
        data.delete(value)

        settings.update((v) => ({
            ...v,
            preference: {
                ...v.preference,
                data: [...data]
            }
        }))
    }

    const toggleTag = (value: string) => () => {
        if ($settings.preference.data.includes(value)) removePreference(value)
        else addPreference(value)
    }

    $: applyActive = (value: string) =>
        $settings.preference.data.includes(value)
            ? 'bg-black text-white border-black'
            : 'text-gray-700'

    $: disabled = !$settings.preference.enable
    $: disabledClass = disabled ? 'opacity-50 pointer-events-none' : ''
</script>

<SettingLayout
    title="Preference"
    label="Add your own tags preference for finding hentai on discover page."
>
    <article class="flex justify-between w-full gap-2">
        <header class="flex flex-col text-lg text-gray-500 gap-2">
            <h3 class="text-2xl font-semibold text-gray-700">Enable</h3>
            <p>Allow custom preference.</p>
            <p>Disable this will not removed preference you have added.</p>
        </header>

        <Toggle class="mt-10" bind:value={$settings.preference.enable} />
    </article>

    <article class="flex flex-col w-full gap-4 text-gray-500 {disabledClass}">
        <h3 class="text-2xl font-semibold text-gray-700">My preferences</h3>
        <p>Type down tags you had like to read.</p>
        <Textfield
            id="preference"
            name="preference"
            label="My preference"
            placeholder="Preference, eg. yuri, futa, etc."
            {disabled}
            onChange={addPreference}
        />

        <section class="flex gap-1.5 flex-wrap w-full">
            {#each $settings.preference.data.filter((t) => !tags.includes(t)) as preference}
                <Chip value={preference} onRemove={removePreference} />
            {/each}
        </section>
    </article>

    <article
        class="flex flex-col w-full gap-4 text-gray-500 {disabledClass}"
        aria-disabled={disabled}
    >
        <p>Or you can choose from top 100 tags.</p>
        <section class="flex gap-1.5 flex-wrap w-full">
            {#each tags as tag}
                <button
                    class="px-3 py-1 rounded-full border {applyActive(
                        tag
                    )} transition-colors"
                    {disabled}
                    on:click={toggleTag(tag)}>{tag}</button
                >
            {/each}
        </section>
    </article>
</SettingLayout>
