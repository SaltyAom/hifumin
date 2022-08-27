<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import { browser } from '$app/env'

    import { CreateCollection } from '@modules'
    import { MemberOnlyPage, NotFound, Image, OpenGraph } from '@shared'
    import { CollectionLayout } from '@layouts'
    import { SkeletonCover } from '@skeletons'

    import { GlobeIcon } from '@icons'
    import { ChevronLeftIcon, LockIcon, PlusIcon, RefreshCwIcon } from 'svelte-feather-icons'
    
    import { multiplePreviewById, type Preview } from '@gql'
    import { isAuthed, user } from '@stores'
    import { 
        galahad, 
        invalidateUserOnUnauthorize, 
        getCollectionList, 
        intersect,
        type CollectionData,
        collectionOverviewStatus,
        type CollectionOverviewStatus,
        purgeCollectionCache,
        purgeCollectionCoverCache,
        purgeCollectionPageCache
    } from '@services'

    let page = 1
    let isLoading = false
    let isEnd = false

    let collections: CollectionData[] = []
    let previews: Record<number, Preview> = {}
    let pendings: AbortController[] = []
    let overview: CollectionOverviewStatus | null

    $: failedToFetch =
        !isLoading &&
        isEnd &&
        page === 1 &&
        collections.length > 0

    const getCollections = async () => {
        if (!$user || isLoading || isEnd) return
        isLoading = true

        try {
            const newCollection = await getCollectionList(page)

            if (!newCollection.length) throw new Error('No data')

            collections = collections.concat(newCollection)
            if (collections.length < 25) isEnd = true

            await getPreviews(
                newCollection
                    .filter(c => c.cover)
                    .map(c => c.cover)
            )
        } catch (err) {
            isEnd = true
        } finally {
            page++
            isLoading = false
        }
    }

    const getOverview = async () => {
        overview = await collectionOverviewStatus()

        if(overview.cover)
            getPreviews([overview.cover])
    }

    const getPreviews = async (ids: number[]) => {
        const abortableController = new AbortController()

        pendings.push(abortableController)

        await multiplePreviewById(
                ids,
                abortableController.signal
            )
            .then(res => {
                res.forEach(p => {
                    if(p?.data?.id) previews[p.data.id] = p.data
                })
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                pendings = pendings.filter(p => p !== abortableController)
            })
    }

    const reset = async () => {
        pendings.forEach(p => p.abort())

        page = 1
        isLoading = false
        isEnd = false
        collections = []
        previews = {}
        pendings = []
        overview = null

        purgeCollectionCache()
        purgeCollectionCoverCache()
        purgeCollectionPageCache()

        await Promise.all([
            getCollections(),
            getOverview()
        ])        
    }

    onMount(() => {
        getCollections()
        getOverview()
    })

    onDestroy(() => {
        pendings.forEach(p => p.abort())
    })

    let isCreatingCollection = false
    const createNewCollection = () => {
        requestAnimationFrame(() => {
            isCreatingCollection = true
        })
    }

    const dismissNewCollection = () => {
        setTimeout(() => {
            requestAnimationFrame(() => {
                isCreatingCollection = false
            })
        }, 216)
    }

    const requestNewCollection = async ({ detail: { close } }) => {
        close()
        dismissNewCollection()
        reset()
    }
</script>

<OpenGraph noIndex />

{#if $user && isCreatingCollection}
    <CreateCollection
        on:close={dismissNewCollection}
        on:create={requestNewCollection}
    />
{/if}

{#if !$user && browser}
    <MemberOnlyPage />
{:else if failedToFetch}
    <div class="flex justify-center items-center favorite-center">
        <NotFound
            class="max-w-xs"
            title="Fail to load"
            detail="Unable to load your collection, please try again later."
            action="Try again"
        />
    </div>
{:else}
    <CollectionLayout loading={!browser || !isAuthed}>
        <header slot="header" class="flex flex-col items-start">
            <button 
                class="flex items-center gap-2 text-blue-500 dark:text-blue-400 font-light text-base px-1 py-0.5 hover:bg-blue-50 focus:bg-blue-50 dark:hover:bg-blue-500/15 dark:focus:bg-blue-500/15 rounded transition-colors"
                on:click={createNewCollection}
            >
                <PlusIcon size="21" strokeWidth={1.5} />
                New Collection
            </button>
    
            <h1 class="text-4xl text-gray-700 dark:text-gray-300 font-medium my-4">
                My Collection
                <button on:click={reset} class="ml-2 text-gray-400">
                    <RefreshCwIcon class="w-6 h-6" strokeWidth={1.5} />
                </button>
            </h1>
        </header>

        {#if overview}
            {@const preview = previews[overview.cover]}
            <a href="/favorite" role="article" class="flex flex-col gap-1 text-gray-400 dark:text-gray-500">
                {#if overview.cover}
                    {#if preview}
                        {@const cover = preview.images.cover}
                        <div class="liftable mb-1">
                            <Image
                                parentClass="rounded-lg"
                                src={cover.link.replace("cover", "1t")}
                                alt="My Favorite"
                                width={cover.info.width}
                                height={cover.info.height}
                                loading="lazy"
                                placeholder="blur"
                                error="blur"
                            />
                        </div>
                    {:else}
                        <figure class="w-full pb-[141.74%] rounded-lg bg-gray-50 dark:bg-gray-700" />
                    {/if}
                {:else}
                    <div class="relative w-full pb-[141.74%] rounded-lg bg-gray-50 dark:bg-gray-700" >
                        <div class="absolute top-0 flex justify-center items-center w-full h-full">
                            <h2>Empty</h2>
                        </div>
                    </div>
                {/if}
                <h4 class="text-gray-700 dark:text-gray-300 text-xl font-medium">My Favorite</h4>
                <footer class="flex flex-row justify-between items-center gap-3 text-gray-400">
                    <div class="flex flex-row flex-1 items-center gap-1">
                        <LockIcon size="18" />
                        <p class="font-light">Private</p>
                    </div>
                    <p class="flex flex-row flex-1 font-light">
                        {overview._count.favorites} total
                    </p>  
                </footer>
            </a>
        {:else}
            <SkeletonCover />
        {/if}

        {#if browser && isAuthed}
            {#each collections as {     
                id,
                cover,
                public: isPublic,
                title,
                _count: {
                    hentai: hentaiCount
                }
             } (id + "." + hentaiCount)}
                {@const preview = previews[cover]}
                <a href="/c/{id}" role="article" class="flex flex-col gap-1 text-gray-400 dark:text-gray-500">
                    {#if cover}
                        {#if preview}
                            {@const cover = preview.images.cover}
                            <div class="liftable mb-1">
                                <Image
                                    parentClass="rounded-lg"
                                    src={cover.link.replace("cover", "1t")}
                                    alt={title}
                                    width={cover.info.width}
                                    height={cover.info.height}
                                    loading="lazy"
                                    placeholder="blur"
                                    error="blur"
                                />
                            </div>
                        {:else}
                            <figure class="w-full pb-[141.74%] rounded-lg bg-gray-50 dark:bg-gray-700" />
                        {/if}
                    {:else}
                        <div class="relative w-full pb-[141.74%] rounded-lg bg-gray-50 dark:bg-gray-700" >
                            <div class="absolute top-0 flex justify-center items-center w-full h-full">
                                <h1>Empty!</h1>
                            </div>
                        </div>
                    {/if}
                    <h4 class="text-gray-700 dark:text-gray-300 text-xl font-medium">{title}</h4>
                    <footer class="flex flex-row justify-between items-center gap-3 text-gray-400">
                        <div class="flex flex-row flex-1 items-center gap-1">
                            {#if isPublic}
                                <GlobeIcon class="w-5 h-5" />
                            {:else}
                                <LockIcon size="18" />
                            {/if}
                            <p class="font-light">{isPublic ? "Public" : "Private"}</p>
                        </div>
                        <p class="flex flex-row flex-1 font-light">
                            {hentaiCount} total
                        </p>  
                    </footer>
                </a>
            {/each}
            {#if !isEnd}
                <SkeletonCover>
                    <div use:intersect on:intersect={getCollections} />
                </SkeletonCover>
                {#each Array(24).fill(null) as _}
                    <SkeletonCover />
                {/each}
            {/if}
        {/if}
    </CollectionLayout>
{/if}

<style lang="sass">
    $expo-out: cubic-bezier(.16,1,.3,1)

    .liftable
        @apply rounded-xl overflow-hidden
        box-shadow: 0
        transition: box-shadow .375s $expo-out, transform .375s $expo-out

        &:hover,
        &:focus,
        &:focus-within
            @apply transform -translate-y-4
            transform: scale(1.025) translateY(-0.75rem)
            box-shadow: 0 4px 8px rgba(0, 0, 0, .1)

</style>