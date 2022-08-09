<script lang="ts">
    import { onMount } from 'svelte'
    import { browser } from '$app/env'

    import { MemberOnlyPage, NotFound, Image } from '@shared'
    import { CollectionLayout } from '@layouts'
    import { SkeletonCover } from '@skeletons'

    import { GlobeIcon } from '@icons'
    import { ChevronLeftIcon, LockIcon } from 'svelte-feather-icons'
    
    import { isAuthed, user } from '@stores'
    import { 
        galahad, 
        invalidateUserOnUnauthorize, 
        getCollectionList, 
        getCollectionListFetch,
        intersect,
        type CollectionData 
    } from '@services'

    let page = 1
    let isLoading = false
    let isEnd = false

    let collections: CollectionData[] = []

    $: failedToFetch =
        !isLoading &&
        isEnd &&
        page === 1 &&
        collections.length > 0

    const getCollections = async () => {
        if (!$user || isLoading || isEnd) return
        isLoading = true

        try {
            const res = await getCollectionListFetch(page)

            if (await invalidateUserOnUnauthorize(res)) return

            const newCollection: CollectionData[] = await res.json()

            if (!newCollection.length) throw new Error('No data')

            collections = collections.concat(newCollection)
            if (collections.length < 25) isEnd = true
        } catch (err) {
            isEnd = true
        } finally {
            page++
            isLoading = false
        }
    }

    onMount(getCollections)
</script>

{#if !$user && browser}
    <MemberOnlyPage />
{:else if failedToFetch}
    <div class="flex justify-center items-center favorite-center">
        <NotFound
            class="max-w-xs"
            title="Fail to load"
            detail="Something went wrong when we try to load your favorite hentais."
            action="Try again"
        />
    </div>
{:else}
    <CollectionLayout loading={!browser || !isAuthed}>
        <header slot="header" class="flex flex-col">
            <h2 class="text-4xl text-gray-700 dark:text-gray-300 font-medium my-4">
                Collection
            </h2>
        </header>

        {#if browser && isAuthed}
            {#each collections as {     
                id,
                cover,
                public: isPublic,
                title
             } (id)}
                <a href="/c/{id}" role="article" class="flex flex-col gap-2 text-gray-400 dark:text-gray-500">
                    {#if cover}
                        <img src={cover} alt={title} />
                    {/if}
                    <h4 class="text-gray-700 dark:text-gray-300 text-xl font-medium">{title}</h4>
                    <footer class="flex flex-row items-center gap-2">
                        {#if isPublic}
                            <GlobeIcon class="w-5 h-5" />
                        {:else}
                            <LockIcon size="18" />
                        {/if}
                        <p>{isPublic ? "Public" : "Private"}</p>
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
