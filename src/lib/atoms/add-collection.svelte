<!-- <script lang="ts">
    import {
        collections,
        addToCollection,
        collectionsArray,
        removeFromCollection
    } from '$lib/stores/collections'
    import user from '$lib/stores/user'
    import { PlusIcon } from 'svelte-feather-icons'

    export let title: string = ''
    export let id: number
    export let dialogClass: string = ''
    export let parentClass: string = ''

    let searchBox: HTMLElement
    let search = ''
    let isDialogOpen = false

    const openDialog = () => {
        isDialogOpen = true

        requestAnimationFrame(() => {
            searchBox.focus()
        })
    }

    const closeDialog = () => {
        isDialogOpen = false
    }

    $: filteredCollection = $collectionsArray.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase())
    )

    const toggleCollection =
        (id: number, name: string, included: boolean) => () => {
            if (included)
                removeFromCollection.update((v) => [
                    ...v,
                    {
                        h: [id],
                        name
                    }
                ])
            else {
                if (search in $collections)
                    addToCollection.update((v) => [
                        ...v,
                        {
                            name,
                            h: [id]
                        }
                    ])
                else createAndAddToCollection(name)()
            }
        }

    const createAndAddToCollection = (name?: string) => () => {
        if (search in $collections) return

        addToCollection.update((collection) => [
            ...collection,
            {
                id: null,
                uid: $user?.id,
                name: name ?? search,
                shared: false,
                h: [id],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ])

        search = ''
    }
</script>

{#if isDialogOpen}
    <div
        class="z-40 fixed top-0 left-0 w-full h-screen"
        on:click={closeDialog}
    />
{/if}

<div class="flex justify-center items-center">
    <div class="flex justify-center {parentClass}">
        <button
            class="flex justify-center items-center text-gray-400 {title
                ? 'px-2 gap-2'
                : 'w-8'} h-8 min-w-8 min-h-8 my-auto rounded-full hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700 transition-colors {$$props.class}"
            title="Add to collection"
            on:click={openDialog}
        >
            <img class="w-5.5 h-5.5" src="/icons/playlist.svg" alt="Add" />
            {title}
        </button>

        {#if isDialogOpen}
            <div
                class="absolute z-50 dialog flex flex-col min-w-48 max-w-48 h-52 mt-8 p-2 text-gray-600 dark:text-gray-400 pb-0 rounded-xl bg-white dark:bg-gray-700 bg-opacity-80 dark:bg-opacity-60 backdrop-blur-xl overflow-hidden {dialogClass}"
            >
                <form
                    class="flex w-full gap-1 border-b border-gray-300 dark:border-gray-600 pb-1"
                    on:submit|preventDefault={createAndAddToCollection()}
                >
                    <img
                        src="/icons/search.svg"
                        alt="Search"
                        class="w-5 h-5 p-0.5"
                    />
                    <input
                        bind:this={searchBox}
                        type="text"
                        class="w-full bg-transparent outline-none ring-transparent"
                        placeholder="My collection"
                        title="Collection name"
                        inputmode="search"
                        bind:value={search}
                    />
                    <button
                        type="submit"
                        class="min-w-6 h-6 p-0.5 text-gray-600 dark:text-gray-200 rounded hover:bg-gray-400/25 focus:bg-gray-400/25 dark:hover:bg-gray-400/50 dark:focus:bg-gray-400/50 transition-colors"
                        title="Create new collection"
                        aria-label="Create new collection"
                    >
                        <PlusIcon strokeWidth={1} />
                    </button>
                </form>
                <section
                    class="relative flex flex-1 flex-col w-full pt-0.5 gap-0.5 overflow-x-hidden overflow-y-auto"
                >
                    {#each filteredCollection as { name, h } (name)}
                        <label
                            class="flex justify-between items-center w-full px-2 py-1 rounded hover:bg-black hover:bg-opacity-5 focus:bg-black focus:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 dark:focus:bg-white dark:focus:bg-opacity-10 transition-colors"
                            >{name}
                            <input
                                type="checkbox"
                                checked={h.includes(id)}
                                on:change={toggleCollection(
                                    id,
                                    name,
                                    h.includes(id)
                                )}
                            />
                        </label>
                    {/each}
                    {#if filteredCollection.length === 0}
                        <p class="text-center text-gray-400 my-auto">
                            Not found
                        </p>
                    {/if}
                </section>
            </div>
        {/if}
    </div>
</div>

<style lang="sass">
    $expo-out: cubic-bezier(.16,1,.3,1)

    .dialog
        // top: calc(50% + 1.625em / 2 + .25em)
        // right: .25em
        box-shadow: 0 4px 16px rgba(66, 39, 39, .12), 0 8px 25px rgb(0 0 0 / 12%)
</style> -->
