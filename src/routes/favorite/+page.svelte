<script lang="ts">
    import { onMount } from 'svelte'
    import { browser } from '$app/environment'

    import { getFavoriteHentais, type FavoriteHentaiData } from '@gql'
    import { galahad, intersect, invalidateUserOnUnauthorize } from '@services'
    import { user, isAuthed } from '@stores'
    
    import { CollectionLayout } from '@layouts'
    import { Cover, Image, MemberOnlyPage, NotFound, SearchNotFound, OpenGraph } from '@shared'
    import { SkeletonCover } from '@skeletons'

    import { ChevronLeftIcon } from 'svelte-feather-icons'

    let page = 1
    let isLoading = false
    let isEnd = false

    let favorite: FavoriteHentaiData[] = []

    $: failedToFetchHentai =
        !isLoading &&
        isEnd &&
        page === 1 &&
        favorite.length > 0 &&
        favorite.every((hentai) => !hentai.data)

    const getFavorite = async () => {
        if (!$user || isLoading || isEnd) return
        isLoading = true

        try {
            const res = await fetch(`${galahad}/favorite/list/${page}`, {
                credentials: 'include'
            })

            if (await invalidateUserOnUnauthorize(res)) return

            const favoriteIds: number[] = await res.json()
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

    onMount(getFavorite)

    const languageMap = {
        english: 'EN',
        japanese: '日本',
        chinese: '中文'
    }

    const mapLanguage = (language: string) => languageMap[language] || '-'

    const reduceNumber = (number: number) => {
        if (number < 1000) return number

        return `${(number / 1000).toFixed(1)}k`
    }
</script>

<OpenGraph noIndex />

{#if !$user && browser}
    <MemberOnlyPage />
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
    <CollectionLayout loading={!browser || !isAuthed}>
        <header slot="header" class="flex flex-col">
            <a
                href="/c"
                class="inline-flex items-center gap-1 text-gray-500 py-1 rounded mb-3"
            >
                <ChevronLeftIcon class="w-6 h-6" /> 
                Back
            </a>

            <h2 class="text-3xl text-gray-700 dark:text-gray-300 font-medium">
                My Favorite
            </h2>
        </header>

        {#if browser && isAuthed}
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
        {/if}
    </CollectionLayout>
{/if}
