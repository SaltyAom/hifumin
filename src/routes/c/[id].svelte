<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { hentaiById, type HentaiByIdData } from '@gql'
    import { 
        collectionCover, 
        collectionPage, 
        deleteCollection, 
        purgeCollectionCache, 
        updateCollection, 
        type CollectionCover 
    } from '@services'

    export const load: Load = async ({ params: { id } }) => {
        const collectionId = +id

        if(Number.isNaN(collectionId) || collectionId < 1) return {
            status: 404
        }

        const [collection, hentaiIds]  = await Promise.all([
            collectionCover(collectionId),
            collectionPage(collectionId, 1),
        ])

        if (!hentaiIds[0])
            return {
                props: {
                    preview: null,
                    id: collectionId,
                    initFavorite: [],
                    collection,
                    page: 1
                }
            }

        const [favorite, previewData] = await Promise.all([
            getFavoriteHentais(hentaiIds),
            hentaiById(hentaiIds[0])
        ])

        const preview = previewData?.images.pages[0]

        return {
            cache: {
                maxage: 3600
            },
            props: {
                preview,
                id: collectionId,
                initFavorite: favorite,
                collection,
                page: 2
            }
        }
    }
</script>

<script lang="ts">
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
    import { BoxIcon, ChevronLeftIcon, FileTextIcon, LockIcon, TrashIcon } from 'svelte-feather-icons'
    
    import dayjs from 'dayjs'
    import relativeTime from 'dayjs/plugin/relativeTime'

    dayjs.extend(relativeTime)

    export let preview: FavoriteHentaiData['data']['images']['cover'] | null
    export let id: number
    export let initFavorite: FavoriteHentaiData[] = []
    export let page: number
    export let collection: CollectionCover | null

    let favorite: FavoriteHentaiData[] = [...initFavorite]

    let isLoading = false
    let isEnd = false
    let notFound = false

    let showDeleteDialog = false

    $: failedToFetchHentai =
        !isLoading &&
        isEnd &&
        page === 1 &&
        favorite.length > 0 &&
        favorite.every((hentai) => !hentai.data)

    let publicStatus: "Public" | "Private" = "Public"
    let _initPublicStatus: "Public" | "Private" = "Public"

    const getFavorite = async () => {
        if (isLoading || isEnd) return
        isLoading = true

        try {
            const favoriteIds = await collectionPage(id, page)
            const data = await getFavoriteHentais(favoriteIds)

            if (!data.length) throw new Error('No data')

            favorite = favorite.concat(data)
            if (data.length < 25) isEnd = true
        } catch (err) {
            isEnd = true
        } finally {
            page++
            isLoading = false
        }
    }

    onMount(async () => {
        if($purgeCollection.has(id)) {
            const invalidation = invalidate("/c/" + id)

            initFavorite = []
            favorite = []
            page = 1

            purgeCollection.update((collection) => {
                collection.delete(id)

                return collection
            })

            await getFavorite()
            initFavorite = [...favorite]
            
            await invalidation
            
            return
        }

        if(initFavorite.length < 25) isEnd = true
        else getFavorite()
    })

    // ? Private collection but owned by user
    onMount(async () => {
        if(!collection) return

        const collectionData = await collectionCover(id)

        if(collectionData) {
            collection = collectionData
            publicStatus = collectionData.public ? "Public" : "Private"
            _initPublicStatus = publicStatus
        } else
            notFound = true
    })

    const languageMap = {
        english: 'EN',
        japanese: '日本',
        chinese: '中文'
    }

    const saveTitle = async ({ currentTarget }: FocusEvent & {
        currentTarget: EventTarget & HTMLHeadingElement;
    }) => {
        if(!collection || !collection.owned || currentTarget.textContent === collection.title) return

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
    <h1>Not Found</h1>
{:else if failedToFetchHentai}
    <div class="flex justify-center items-center favorite-center">
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
            title="Read {collection.title} collection, {collection._count.hentai} in total - Hifumin Collection"
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

            <h1 
                class="text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 font-medium outline-none"
                contenteditable={collection.owned}
                on:blur={saveTitle}
            >
                {collection.title}
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
                        class="inline-flex justify-center items-center gap-2 font-light text-red-400 hover:bg-red-50 focus:bg-red-50 dark:hover:bg-red-900/50 dark:focus:bg-red-900/50 ml-2 px-3 py-1.5 rounded transition-colors"
                        on:click={requestDeleteDialog}
                    >
                        <TrashIcon size="18" />
                        Delete
                    </button>
                {/if}
            </section>

            <p class="text-lg text-gray-400 font-light">
                Last update: {dayjs(collection.updated).fromNow()}
            </p>
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
                <div use:intersect on:intersect={getFavorite} />
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
</style>