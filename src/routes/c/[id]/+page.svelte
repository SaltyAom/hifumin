<script lang="ts">
    import { 
        collectionCover, 
        collectionPage, 
        deleteCollection, 
        purgeCollectionById, 
        purgeCollectionCache, 
        updateCollection, 
        type CollectionCover 
    } from '@services'

    import { onMount } from 'svelte'
    import { browser } from '$app/env'
    import { goto, invalidate } from '$app/navigation'

    import { getFavoriteHentais, type FavoriteHentaiData } from '@gql'
    import { galahad, intersect, invalidateUserOnUnauthorize } from '@services'
    import { purgeCollection, user } from '@stores'
    
    import { CollectionLayout } from '@layouts'
    import { 
        Cover, 
        Dropdown,
        Image, 
        MemberOnlyPage, 
        NotFound, 
        SearchNotFound,
        Dialog,
        ProgressIndicator,
        OpenGraph
    } from '@shared'
    import { SkeletonCover } from '@skeletons'
    import { GlobeIcon } from '@icons'
    import { 
        BoxIcon, 
        ChevronLeftIcon, 
        FileTextIcon, 
        LockIcon, 
        TrashIcon,
        RefreshCwIcon,
        ShareIcon,
        LinkIcon
    } from 'svelte-feather-icons'
    
    import dayjs from 'dayjs'
    import relativeTime from 'dayjs/plugin/relativeTime'

    dayjs.extend(relativeTime)

    export let data: {
        id: number
        preview: FavoriteHentaiData['data']['images']['cover'] | null
        initFavorite: FavoriteHentaiData[]
        collection: CollectionCover | null
    }

    $: ({
        id,
        preview,
        initFavorite = [],
        collection
    } = data)

    $: favorite = [...(initFavorite ?? [])]
    $: lastId = favorite[favorite.length - 1]?.id ?? undefined

    let isLoading = false
    let isEnd = false
    let notFound = false

    let showDeleteDialog = false

    $: failedToFetchHentai =
        !isLoading &&
        isEnd &&
        (!lastId && favorite[0]) &&
        favorite.length > 0 &&
        favorite.every((hentai) => !hentai.data)

    let publicStatus: "Public" | "Private" = "Public"
    let _initPublicStatus: "Public" | "Private" = "Public"

    const requestMoreFavorite = () => {
        getFavorite()
    }

    const getFavorite = async (reset = false) => {
        if (isLoading || isEnd) return
        isLoading = true

        try {
            const favoriteIds = await collectionPage(id, reset ? undefined : lastId)
            const data = await getFavoriteHentais(favoriteIds)

            if (!data.length) throw new Error('No data')

            favorite = favorite.concat(data)
            if (data.length < 25)
                isEnd = true            
        } catch (err) {
            isEnd = true
        } finally {
            isLoading = false
        }
    }

    const reloadClient = async () => {
        if($purgeCollection.has(id)) {
            const invalidation = invalidate("/c/" + id)

            initFavorite = []
            favorite = []

            purgeCollection.update((collection) => {
                collection.delete(id)

                return collection
            })

            await getFavorite(true)
            initFavorite = [...favorite]
            
            await invalidation
            
            return
        }

        if(initFavorite.length < 25) isEnd = true
        else getFavorite()
    }
    onMount(reloadClient)

    const loadClient = async () => {
        if(collection) return

        const collectionData = await collectionCover(id)

        console.log("A", collectionData, collection, initFavorite)

        if(collectionData) {
            collection = collectionData
            publicStatus = collectionData.public ? "Public" : "Private"
            _initPublicStatus = publicStatus
        } else
            notFound = true
    }
    onMount(loadClient)

    const reset = () => {
        purgeCollectionById(id)
        purgeCollection.update((collection) => {
            collection.add(id)

            return collection
        })
        
        favorite = []
        collection = null
        isEnd = false
        notFound = false
        showDeleteDialog = false

        loadClient()
        reloadClient()
    }

    const languageMap = {
        english: 'EN',
        japanese: '日本',
        chinese: '中文'
    }

    const saveTitle = async ({ currentTarget }: FocusEvent & {
        currentTarget: EventTarget & HTMLHeadingElement;
    }) => {
        if(!collection || !collection.owned || currentTarget.textContent === collection.title) 
            return

        const { textContent: title } = currentTarget

        const res = await updateCollection(collection.id, {
            title
        })

        if(res instanceof Error) {
            return
        }

        collection.title = title
    }

    $: {
        publicStatus

        updatePublic()
    }

    const updatePublic = async () => {
        if(publicStatus === _initPublicStatus) return

        const _isPublic = publicStatus === "Public"

        const res = await updateCollection(collection.id, {
            public: _isPublic
        })

        if(res instanceof Error) {
            return
        }

        collection.public = _isPublic
        _initPublicStatus = publicStatus
    }

    const mapLanguage = (language: string) => languageMap[language] || '-'

    const reduceNumber = (number: number) => {
        if (number < 1000) return number

        return `${(number / 1000).toFixed(1)}k`
    }

    const requestDeleteDialog = () => {
        showDeleteDialog = true
    }

    const closeDeleteDialog = () => {
        setTimeout(() => {
            showDeleteDialog = false
        }, 216)
    }

    let isDeleting = false
    let deleteError = ""

    const requestDeleteCollection = async () => {
        if(isDeleting) return

        isDeleting = true
        const deleted = await deleteCollection(id)
        isDeleting = false

        if(deleted instanceof Error) {
            deleteError = deleted.message
            return
        }

        purgeCollectionCache()

        goto("/c")
    }

    const openShareSheet = () => {
        navigator.share({
            title: collection.title,
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

    $: cover = initFavorite[0]?.data?.images.cover
</script>

{#if showDeleteDialog && collection}
    <Dialog
        title={`Delete "${collection.title}"`}
        actionClass="!text-red-500 bg-red-50 !text-red-400 !dark:bg-red-500/15"
        on:close={closeDeleteDialog}
        on:action={requestDeleteCollection}
    >
        Are you sure you want to delete the album "{collection.title}"?
        <span>
            This action cannot be undone.
        </span>
        {#if deleteError}
            <span class="text-red-500 dark:text-red-400 font-medium">
                {deleteError}
            </span>
        {/if}

        <div slot="action" class="flex items-center gap-3">
            {#if isDeleting}
                <ProgressIndicator class="!w-6 !h-6" stroke="rgba(239, 68, 68)" />
            {/if}
            Delete
        </div>
    </Dialog>
{/if}

{#if notFound}
    <div class="flex justify-center items-center h-error">
        <NotFound
            class="max-w-2xs m-auto"
            detail="This page is either private or does not exist."
            action="Try again"
        />
    </div>
{:else if failedToFetchHentai}
    <div class="flex justify-center items-center h-error">
        <NotFound
            class="max-w-xs"
            title="Fail to load"
            detail="Something went wrong when we try to load your favorite hentais."
            action="Try again"
        />
    </div>
{:else}
    {#if collection}
        <OpenGraph
            title="{collection.title} collection, {collection._count.hentai} stor{collection._count.hentai < 1 ? "ies" : "y"} to read - Hifumin Collection"
            description="{collection.title} total page: {collection._count.hentai}, &raquo; Read on Hifumin: hentai doujinshi and manga"
            image={preview ?? undefined}
        />
    {/if}

    <CollectionLayout loading={!browser}>
        <header slot="header" class="flex flex-col items-start">
            <a
                href={$user ? '/c' : '/'}
                class="inline-flex items-center gap-1 text-gray-500 py-1 rounded mb-3"
            >
                <ChevronLeftIcon class="w-6 h-6" /> 
                Back
            </a>

            {#if collection}
                <h1
                    class="text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 font-medium outline-none"
                    contenteditable={collection.owned}
                    on:blur={saveTitle}
                >
                    {collection.title}
                    <button on:click={reset} class="ml-2 text-gray-400">
                        <RefreshCwIcon class="w-6 h-6" strokeWidth={1.5} />
                    </button>
                </h1>
                <section class="flex items-center gap-6 mt-2 font-light">
                    <div class="flex items-center gap-1.5 font-light text-lg text-gray-400">
                        {#if publicStatus === "Public"}
                            <GlobeIcon class="w-5 h-5" />
                        {:else}
                            <LockIcon size="18" />
                        {/if}

                        {#if collection.owned}
                            <Dropdown 
                                bind:value={publicStatus}
                                class="w-[8.5ch] ml-1" 
                                selectorClass="!bg-transparent !font-light !text-lg !text-gray-400 !px-0" 
                                chevronClass="stroke-1"
                                optionClass="!px-3.5 !py-1"
                                options={["Public", "Private"]}                        
                            />
                        {:else}
                            <p class="py-2">{collection.public ? 'Public' : 'Private'}</p>
                        {/if}
                    </div>
                    <p class="text-lg text-gray-400">
                        {collection._count.hentai} total
                    </p>

                    {#if collection.owned}
                        <button 
                            class="inline-flex justify-center items-center gap-2 font-light text-red-400 hover:bg-red-50 focus:bg-red-50 dark:hover:bg-red-900/50 dark:focus:bg-red-900/50 ml-2 px-3 py-1.5 rounded-lg transition-colors"
                            on:click={requestDeleteDialog}
                        >
                            <TrashIcon size="18" />
                            Delete
                        </button>
                    {/if}
                </section>
                
                <section class="flex items-center gap-6">
                    <p class="text-lg text-gray-400 font-light">
                        Last update: {dayjs(collection.updated).fromNow()}
                    </p>
                    {#if browser && navigator.share}
                    <button 
                        class="flex items-center gap-2 text-gray-400 hover:text-blue-500 focus:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400 font-light px-3 py-1.5 hover:bg-blue-50 focus:bg-blue-50 dark:hover:bg-blue-500/15 dark:focus:bg-blue-500/15 rounded-lg transition-colors"
                        title="Share this collection"
                        aria-label="Share this collection"
                        on:click={openShareSheet}
                    >
                        <ShareIcon size="18" />
                        Share
                    </button>
                    {:else}
                        <button 
                            class="flex items-center gap-2 text-gray-400 hover:text-blue-500 focus:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400 font-light px-3 py-1.5 hover:bg-blue-50 focus:bg-blue-50 dark:hover:bg-blue-500/15 dark:focus:bg-blue-500/15 rounded-lg transition-colors"
                            title="Copy collection URL"
                            aria-label="Copy collection URL"
                            on:click={copyLink}
                        >
                            <LinkIcon size="18" />
                            {#if noticeCopy}
                                Copied
                            {:else}
                                Copy Link
                            {/if}
                        </button>
                    {/if}
                </section>
            {:else}
                <h1
                    class="w-74 h-8 mt-1 bg-gray-100 dark:bg-gray-600 rounded-lg"
                />
                <section class="flex items-center gap-6 mt-2 font-light">
                    <div class="flex items-center h-[50px] gap-1.5 font-light text-lg text-gray-400 my-1">
                        <p
                            class="w-6 h-6 bg-gray-100 dark:bg-gray-600 rounded-lg"
                        />

                        <p
                            class="w-[8.5ch] h-6 bg-gray-100 dark:bg-gray-600 rounded-lg"
                        />
                    </div>
                    <p
                        class="w-16 h-6 bg-gray-100 dark:bg-gray-600 rounded-lg"
                    />                    
                </section>

                <p
                    class="w-60 h-6 bg-gray-100 dark:bg-gray-600 rounded-lg"
                />
            {/if}
        </header>

        <svelte:fragment slot="outer">
            {#if isEnd && !favorite[0]}
                <section class="flex flex-col justify-center items-center gap-2 w-full h-area text-gray-500 dark:text-gray-400">
                    <BoxIcon size="72" strokeWidth={1} />
                    <h4 class="mt-2 text-2xl font-medium">Empty</h4>
                    <p class="text-lg text-gray-400 dark:text-gray-500">
                        No hentai in this collection
                    </p>
                </section>
            {/if}
        </svelte:fragment>

        {#each favorite as favoriteH (favoriteH.id)}
            {@const h = favoriteH.data}
            {@const cover = h?.images.cover}
            {#if favoriteH.success}
                <Cover hentai={{
                    ...h,
                    id: favoriteH.id,
                }} />
            {:else}
                <a href="/h/{favoriteH.id}">
                    <SkeletonCover>
                        <h3
                            class="text-lg font-medium text-gray-400 dark:text-gray-6000"
                        >
                            {favoriteH.id}
                        </h3>
                    </SkeletonCover>
                </a>
            {/if}
        {/each}
        {#if !isEnd}
            <SkeletonCover>
                <div use:intersect on:intersect={requestMoreFavorite} />
            </SkeletonCover>
            {#each Array(24).fill(null) as _}
                <SkeletonCover />
            {/each}
        {/if}
    </CollectionLayout>
{/if}

<style lang="sass">
    .h-area
        @apply pb-8
        height: calc(100vh - 4em - 4em - 2em - 124px)

        @screen sm
            &
                @apply pb-16
                height: calc(100vh - 4em - 2em - 124px - 4em - 1em)

    .h-error
        @apply pb-16
        height: calc(100vh - 4em - 4em)

        @screen sm
            &
                height: calc(100vh - 4em)
</style>