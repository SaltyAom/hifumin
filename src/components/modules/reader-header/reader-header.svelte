<script lang="ts">
    import { onMount, afterUpdate } from 'svelte'
    import { goto } from '$app/navigation'
    import { browser } from '$app/environment'

    import { user, isAuthed } from '@stores'
    import {
        ListView,
        ListTile,
        Image,
        MemberOnlyDialog,
        Dropdown,
        TextField,
        Dialog,
    } from '@shared'
    import { CreateCollection } from '@modules'
    import {
        setCollectionByHentai,
        updateFavoriteById,
        getCollectionStatus,
        isFavorite as getIsFavorite,
        invalidateUserOnUnauthorize,
        createCollection,
        type CollectionStatusData,
        purgeCollectionById,
        purgeCollectionCache,
        unescapeHTML
    } from '@services'
    import type { HentaiByIdData } from '@gql'

    import {
        BookOpenIcon,
        HeartIcon,
        Edit2Icon,
        LockIcon,
        CheckIcon,
        ShareIcon,
        MessageSquareIcon,
        LinkIcon,
        FilmIcon,
        UsersIcon,
        TagIcon,
        BookmarkIcon,
        PlusIcon
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
        metadata: { artists, language, tags, parodies, characters },
        info: { amount, favorite: totalFavorite }
    } = hentai)

    let isLoading = false
    let init = false
    let collections: Omit<CollectionStatusData, 'selected'>[] = []
    let initialSelected = new Set<number>()
    let selected = new Set<number>()
    let initialFavorite = false
    let isFavorite = false

    $: {
        id

        resetStatus()
    }

    let requestClose: () => void
    $: {
        if (showDialog) requestClose = undefined
    }

    const resetStatus = () => {
        isLoading = false
        init = false
        collections = []
        initialSelected = new Set<number>()
        selected = new Set<number>()
        initialFavorite = false
        isFavorite = false
    }

    let showDialog = false
    let showNewColletionDialog = false

    const toggleFavorite = () => {
        isFavorite = !isFavorite
    }

    let isOpeningDialog = false

    $: openDialog = async () => {
        if (isOpeningDialog) return

        if(!$user) {
            showNewColletionDialog = true

            return
        }

        requestAnimationFrame(() => {  
            isOpeningDialog = true
        })

        if (!init) {
            init = true

            const { isFavorite: _isFavorite, collection: _collections } =
                await getCollectionStatus(id)

            isFavorite = _isFavorite
            initialFavorite = isFavorite

            collections = _collections.map((collection) => {
                if (collection.selected) {
                    selected.add(collection.id)
                    initialSelected.add(collection.id)
                }

                return collection
            })
        }

        requestAnimationFrame(() => {
            isOpeningDialog = false
            showDialog = true
        })
    }

    const closeDialog = () => {
        showDialog = false
    }

    const toggle = (id: number) => () => {
        if (selected.has(id)) selected.delete(id)
        else selected.add(id)

        selected = selected
    }

    const handleNewCollection = async ({ detail: { id, public: isPublic, title } }) => {
        collections.unshift({
            id,
            public: isPublic,
            title
        })

        requestAnimationFrame(() => {
            toggle(id)
            closeCollectionDialog()
        })
    }

    const addToCollection = async () => {
        const add: number[] = []
        const remove: number[] = []

        collections.forEach(({ id }) => {
            const current = selected.has(id)
            const old = initialSelected.has(id)

            if (current === old) return

            if (current) add.push(id)
            else remove.push(id)
        })

        const setCollectionRequest = new Promise<void>(async (resolve) => {
            closeDialog()

            if (add[0] || remove[0]) {
                const uniques = [...new Set([...add, ...remove])]

                uniques.forEach(id => {
                    purgeCollectionById(id)
                })

                const res = await setCollectionByHentai(id, {
                    add,
                    remove
                })

                if (res instanceof Error) {
                    selected = new Set([...initialSelected])
                } else {
                    initialSelected = new Set([...selected])
                }
            }

            resolve()
        })

        const setFavoriteRequest = new Promise<void>(async (resolve) => {
            if (initialFavorite !== isFavorite) {
                purgeCollectionCache()

                const res = await updateFavoriteById(id, isFavorite)

                if (res instanceof Error) isFavorite = initialFavorite
                else initialFavorite = isFavorite
            }

            resolve()
        })

        await Promise.all([setCollectionRequest, setFavoriteRequest])
    }

    const openCollectionDialog = () => {
        requestClose()

        requestAnimationFrame(() => {
            showNewColletionDialog = true
        })
    }

    const closeCollectionDialog = () => {
        openDialog()

        setTimeout(() => {
            showNewColletionDialog = false
        }, 233)
    }

    const openShareSheet = () => {
        navigator.share({
            title: display,
            url: `${location.origin}${location.pathname}`
        })
    }

    let noticeCopy = false
    let latestNotice: number | null = null

    const copyLink = async () => {
        await navigator.clipboard.writeText(`${location.origin}${location.pathname}`)
        noticeCopy = true

        if(latestNotice)
            clearTimeout(latestNotice)

        latestNotice = setTimeout(() => {
            noticeCopy = false
        }, 1500) as unknown as number
    }

    const formatNumber = (value: number) => !Intl
        ? value
        : Intl.NumberFormat().format(value)

    const actionClass = "flex flex-col justify-center items-center gap-1 flex-1  hover:text-blue-500 focus:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400 h-20 rounded-lg hover:bg-blue-50 focus:bg-blue-50 dark:hover:bg-blue-500/15 dark:focus:bg-blue-500/15 transition-colors"
    const numberClass = "font-light text-gray-400 dark:text-gray-500"
</script>

<svelte:head>
    <link rel="preload" as="image" href={link} />
</svelte:head>

{#if showNewColletionDialog}
    {#if !$user}
        <MemberOnlyDialog on:close={closeCollectionDialog} />
    {:else}
        <CreateCollection
            on:close={closeCollectionDialog}
            on:create={handleNewCollection}
        />
    {/if}
{/if}

{#if showDialog}
    {#if !$user}
        <MemberOnlyDialog on:close={closeDialog} />
    {:else}
        <ListView noDismiss bind:requestClose on:close={addToCollection}>
            <ListTile noAction title="Save to..." class="md:sticky top-0 !py-2 !pr-3 border-b dark:border-gray-700">
                <button
                    slot="trailing"
                    class="flex flex-row items-center gap-2 text-gray-600 font-light px-2 py-1 rounded text-blue-500 dark:text-blue-400 hover:bg-blue-50 focus:bg-blue-500 dark:hover:bg-blue-500/15 dark:hover:bg-blue-500/15 transition-colors"
                    on:click={openCollectionDialog}
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
                    class="text-gray-700 dark:text-gray-400"
                    size="21"
                    strokeWidth={1.5}
                />
            </ListTile>

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
                                class="text-gray-700 dark:text-gray-400"
                                strokeWidth={1.5}
                            />
                        {:else}
                            <LockIcon
                                class="text-gray-700 dark:text-gray-400"
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

<header class="z-20 flex flex-col md:flex-row items-center gap-8 w-11/12 md:w-full max-w-178 mx-auto p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-3xl">
    <div class="w-full md:min-w-[320px] md:max-w-[320px]">
        <Image
            src={link}
            alt={display}
            parentClass="rounded-2xl shadow-2xl overflow-hidden"
            {width}
            {height}
            autoReload
        />
    </div>

    <section class="flex flex-col gap-2 mr-auto mt-2">
        <header class="flex flex-col gap-1">
            <h6 class="text-sm text-gray-400 dark:text-gray-500">{id}</h6>
            <h1 class="text-2xl text-gray-800 dark:text-gray-300">
                {unescapeHTML(display)}
            </h1>
        </header>

        <section class="flex items-start gap-4 text-gray-500 dark:text-gray-400">
            <h5 class="flex items-center gap-2 capitalize">
                <TranslateIcon class="w-5 h-5" />
                {language}
            </h5>
            <h5 class="flex items-center gap-2 capitalize">
                <BookOpenIcon size="18" />
                {amount}
            </h5>
            <h5 class="flex items-center gap-2 capitalize">
                <HeartIcon size="18" />
                {formatNumber(totalFavorite)}
            </h5>
        </section>

        <section class="flex items-center text-gray-500 dark:text-gray-400 gap-3 text-sm">
            <button
                class={actionClass}
                title="Add to Collection"
                aria-label="Add to Collection"
                on:click={openDialog}
            >
                <BookmarkIcon class="w-9 h-9 p-1" strokeWidth={1.5} />
                Collection
            </button>
            <a
                href="#comment"
                class={actionClass}
                title="Go to comments"
                aria-label="Go to comments"
            >
                <MessageSquareIcon class="w-9 h-9 p-1" strokeWidth={1.5} />
                Comment
            </a>
            {#if browser && navigator.share}
                <button
                    class={actionClass}
                    title="Share this story"
                    aria-label="Share this story"
                    on:click={openShareSheet}
                >
                    <ShareIcon class="w-9 h-9 p-1" strokeWidth={1.5} />
                    Share
                </button>
            {:else}
                <button
                    class={actionClass}
                    title="Copy Link"
                    aria-label="Copy Link"
                    on:click={copyLink}
                >
                    <LinkIcon class="w-9 h-9 p-1" strokeWidth={1.5} />
                    {#if noticeCopy}
                        Copied
                    {:else}
                        Copy Link
                    {/if}
                </button>
            {/if}
        </section>

        {#if parodies[0]}
            <section
                class="flex items-center gap-2 text-gray-700 dark:text-gray-400 capitalize flex-wrap"
            >
                <FilmIcon size="18" strokeWidth={1.5} />
                {#each parodies as { name, count } (name)}
                    <a href="/search/{name}">
                        {name} <span class={numberClass}>({formatNumber(count)})</span>
                    </a>
                {/each}
            </section>
        {/if}

        {#if characters[0]}
            <section
                class="flex items-center gap-2 text-gray-600 dark:text-gray-400 capitalize flex-wrap"
            >
                <UsersIcon size="18" class="text-gray-500 dark:text-gray-400" />
                {#each characters as { name, count } (name)}
                    <a href="/search/{name}">
                        {name} <span class={numberClass}>({formatNumber(count)})</span>
                    </a>
                {/each}
            </section>
        {/if}

        {#if artists[0]}
            <section
                class="flex items-center gap-2 text-gray-700 dark:text-gray-400 capitalize flex-wrap"
            >
                <Edit2Icon size="18" />
                {#each artists as { name, count } (name)}
                    <a href="/search/{name}">
                        {name} <span class={numberClass}>({formatNumber(count)})</span>
                    </a>
                {/each}
            </section>
        {/if}

        <h4 class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <TagIcon size="18" />
            {tags.length} tags:
        </h4>

        <section
            class="flex flex-wrap w-full gap-1 md:max-h-[15ch] overflow-x-hidden overflow-y-auto snap-y snap-mandatory"
        >
            {#each tags as { name } (name)}
                <a
                    class="text-gray-700 dark:text-gray-400 px-2.5 py-1 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700 border dark:border-gray-600 rounded-full snap-start transition-colors"
                    href={`/search/${name}`}
                >
                    {name}
                </a>
            {/each}
        </section>
    </section>
</header>
