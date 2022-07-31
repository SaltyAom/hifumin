<script lang="ts">
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'
    import { browser } from '$app/env'

    import { user, isAuthed } from '@stores'
    import { ListView, ListTile, Image, MemberOnly } from '@shared'
    import {
        getCollectionList,
        isFavorite as getIsFavorite,
        invalidateUserOnUnauthorize,
        type CollectionData
    } from '@services'
    import type { HentaiByIdData } from '@gql'

    import {
        BookOpenIcon,
        HeartIcon,
        Edit2Icon,
        BookmarkIcon,
        PlusSquareIcon,
        LockIcon,
        PlusIcon,
        CheckIcon
    } from 'svelte-feather-icons'
    import { TranslateIcon, GlobeIcon } from '@icons'

    export let hentai: HentaiByIdData

    $: ({
        id,
        title: { display },
        images: {
            cover: {
                link,
                info: { width, height }
            }
        },
        metadata: { artists, language, tags },
        info: { amount, favorite }
    } = hentai)

    let isLoading = false

    $: {
        hentai
        $user

        isLoading = false
    }

    let init = false
    let collections: CollectionData[] = []
    let selected = new Set()
    let isFavorite = false

    onMount(async () => {
        if (!browser || !$user) return
    })

    let showDialog = false

    const openDialog = async () => {
        let _isFavorite: Promise<boolean>

        if (!init) {
            init = true
            _isFavorite = getIsFavorite(id)
            collections = await getCollectionList()
        }

        requestAnimationFrame(() => {
            showDialog = true
        })

        if (_isFavorite) isFavorite = await _isFavorite
    }

    const closeDialog = () => {
        showDialog = false
    }

    const toggle = (id: number) => () => {
        if (selected.has(id)) selected.delete(id)
        else selected.add(id)

        selected = selected
    }

    const toggleFavorite = () => {
        isFavorite = !isFavorite
    }

    const addToCollection = () => {}
</script>

<svelte:head>
    <link rel="preload" as="image" href={link} />
</svelte:head>

{#if showDialog}
    {#if !$user}
        <MemberOnly on:close={closeDialog} />
    {:else}
        <ListView on:close={closeDialog}>
            <ListTile noAction title="Save to..." class="!py-2 !pr-3 border-b">
                <button
                    slot="trailing"
                    class="flex flex-row items-center gap-2 text-gray-600 font-light px-2 py-1 rounded text-blue-500"
                >
                    <PlusIcon size="21" strokeWidth={1.5} />
                    New Collection
                </button>
            </ListTile>
            <ListTile title="My Favorite" on:select={toggleFavorite}>
                <div slot="leading">
                    {#if isFavorite}
                        <CheckIcon size="24" strokeWidth={1.5} />
                    {:else}
                        <div class="w-[24px] h-[24px]" />
                    {/if}
                </div>

                <HeartIcon
                    slot="trailing"
                    class="text-gray-700"
                    size="21"
                    strokeWidth={1.5}
                />
            </ListTile>

            <!-- <ListTile title="-">
                <div slot="leading" class="w-[24px] h-[24px]" />
            </ListTile> -->

            {#each collections as { id, title, public: isPublic } (id)}
                <ListTile {title} on:select={toggle(id)}>
                    <div slot="leading">
                        {#if selected.has(id)}
                            <CheckIcon size="24" strokeWidth={1.5} />
                        {:else}
                            <div class="w-[24px] h-[24px]" />
                        {/if}
                    </div>
                    <div slot="trailing">
                        {#if isPublic}
                            <GlobeIcon
                                class="text-gray-700"
                                strokeWidth={1.5}
                            />
                        {:else}
                            <LockIcon
                                class="text-gray-700"
                                size="21"
                                strokeWidth={1.5}
                            />
                        {/if}
                    </div>
                </ListTile>
            {/each}
        </ListView>
    {/if}
{/if}

<header
    class="z-20 flex flex-col md:flex-row items-center gap-8 w-11/12 md:w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-3xl"
>
    <div class="w-full md:min-w-[300px] md:max-w-[300px]">
        <Image
            src={link}
            alt={display}
            parentClass="rounded-2xl shadow-2xl overflow-hidden"
            {width}
            {height}
            autoReload
        />
    </div>

    <section class="flex flex-col gap-2 mr-auto">
        <header class="flex flex-col gap-1">
            <h6 class="text-sm text-gray-400 dark:text-gray-500">{id}</h6>
            <h1 class="text-2xl text-gray-800 dark:text-gray-300">
                {display}
            </h1>
        </header>

        <section
            class="flex items-center gap-1 text-gray-700 dark:text-gray-400 capitalize flex-wrap"
        >
            <Edit2Icon size="18" />
            {#each artists as { name, count } (name)}
                <a href="/search/{name}">
                    {name} ({count})
                </a>
            {/each}
        </section>

        <div class="flex flex-col gap-2 text-gray-500 dark:text-gray-400">
            <h5 class="flex items-center gap-1 capitalize">
                <TranslateIcon class="w-5 h-5" />
                {language}
            </h5>
            <div class="flex justify-between items-center gap-2">
                <h5 class="flex min-w-[6ch] items-center gap-1.5 capitalize">
                    <BookOpenIcon size="18" />
                    {amount}
                </h5>
                <h5 class="flex flex-1 items-center gap-1 capitalize">
                    <HeartIcon size="18" />
                    {!Intl ? favorite : Intl.NumberFormat().format(favorite)}
                </h5>
            </div>
        </div>

        <div class="flex items-center text-gray-400 gap-2 my-2">
            <button
                class="flex justify-center items-center gap-2 h-8 px-2 border dark:border-gray-600 rounded-full hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700 transition-colors"
                title="Find translation"
                on:click={openDialog}
            >
                <PlusSquareIcon class="w-5.5 h-5.5 p-0.5" />
                Save
            </button>
            <!-- <button
                class="flex justify-center items-center gap-1 h-8 px-2 pr-3 border dark:border-gray-600 rounded-full transition-colors {isFavorite
                    ? 'text-white bg-blue-500 dark:bg-blue-600 border-blue-500 dark:border-blue-600 hover:bg-blue-500 focus:bg-blue-500 dark:hover:bg-blue-600 dark:focus:bg-blue-600'
                    : 'hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700'}"
                title="Find translation"
                on:click={addToFavorite}
            >
                <HeartIcon class="w-5.5 h-5.5 p-0.5" />
                Favorite
            </button> -->
        </div>

        <h4 class="text-gray-500 dark:text-gray-400">
            {tags.length} tags:
        </h4>

        <div
            class="flex flex-wrap w-full gap-1 md:max-h-[15ch] overflow-x-hidden overflow-y-auto snap-y snap-mandatory"
        >
            {#each tags as { name } (name)}
                <a
                    class="text-gray-700 dark:text-gray-400 px-2 py-1 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700 border dark:border-gray-600 rounded-full snap-start transition-colors"
                    href={`/search/${name}`}>{name}</a
                >
            {/each}
        </div>
    </section>
</header>
