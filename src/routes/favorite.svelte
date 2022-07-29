<script lang="ts">
    import { onMount } from 'svelte'
    import { browser } from '$app/env'

    import { favoriteHentais, type FavoriteHentaiData } from '@gql'
    import { galahad, intersect, invalidateUserOnUnauthorize } from '@services'
    import { user, isAuthed } from '@stores'

    import { Image, NotFound, SearchNotFound } from '@shared'
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
            const data = await favoriteHentais(favoriteIds)

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

<main
    class="flex flex-col gap-4 w-full max-w-5xl mx-auto px-4 py-4 md:py-8 text-gray-700 dark:text-gray-300"
>
    <div>
        <a
            href="/"
            class="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 py-1 rounded"
            ><ChevronLeftIcon class="w-6 h-6" /> Back</a
        >
    </div>
    {#if !browser || !isAuthed}
        <header class="flex flex-col">
            <h2 class="text-3xl text-gray-700 dark:text-gray-300 font-medium">
                My Favorite
            </h2>
        </header>

        <section class="relative grid collection w-full gap-6 md:gap-8">
            {#each Array(25).fill(null) as _}
                <SkeletonCover />
            {/each}
        </section>
    {:else if !$user}
        <section
            class="flex flex-col justify-center items-center w-full max-w-sm favorite-center text-gray-400 dark:text-gray-400 text-lg text-center mx-auto"
        >
            <h1 class="text-3xl font-medium text-gray-700 dark:text-gray-300">
                Member only feature
            </h1>
            <p class="mt-6 mb-4">
                Bookmark let you save your favorite doujinshi on cloud across
                your devices.
            </p>
            <p>To use this feature, sign in to your account.</p>

            <a
                href="/signin"
                class="text-white text-lg font-medium mt-8 mb-4 px-12 py-2 bg-blue-500 dark:bg-blue-600 rounded-lg"
            >
                Sign In
            </a>

            <a href="/" class="text-blue-500 text-lg font-medium px-8 py-2">
                No thanks
            </a>
        </section>
    {:else}
        <header class="flex flex-col">
            <h2 class="text-3xl text-gray-700 dark:text-gray-300 font-medium">
                My Favorite
            </h2>
        </header>

        {#if failedToFetchHentai}
            <div class="flex justify-center items-center favorite-center">
                <NotFound
                    class="max-w-xs"
                    title="Fail to load"
                    detail="Something went wrong when we try to load your favorite hentais."
                    action="Try again"
                />
            </div>
        {:else}
            <section class="relative grid collection w-full gap-6 md:gap-8">
                {#each favorite as favoriteH (favoriteH.id)}
                    {@const h = favoriteH.data}
                    {@const cover = h?.images.cover}
                    {#if favoriteH.success}
                        <article class="w-full">
                            <a
                                class="liftable relative flex flex-col gap-2"
                                href="/h/{favoriteH.id}"
                                sveltekit:prefetch
                            >
                                <figure class="cover inline p-0">
                                    <Image
                                        parentClass="rounded-lg overflow-hidden"
                                        class="object-cover object-center"
                                        src={cover.link}
                                        width={cover.info.width}
                                        height={cover.info.height}
                                    />
                                </figure>
                                <h1
                                    class="font-medium text-lg text-gray-500 dark:text-gray-300 mt-1"
                                >
                                    {h.title.display}
                                </h1>

                                <div
                                    class="flex flex-row justify-between text-gray-400 gap-1 md:gap-1.5"
                                >
                                    <p
                                        class="flex flex-[5] sm:flex-[4] items-center gap-1 capitalize"
                                    >
                                        <img
                                            class="w-3.5 h-3.5"
                                            src="/icons/language.svg"
                                            alt="Add"
                                        />
                                        {mapLanguage(h.metadata.language)}
                                    </p>
                                    <p
                                        class="flex flex-[4] items-center gap-1 capitalize"
                                    >
                                        <img
                                            class="w-3.5 h-3.5"
                                            src="/icons/book-open.svg"
                                            alt="Add"
                                        />
                                        {h.info.amount}
                                    </p>
                                    <p
                                        class="flex flex-[4] items-center gap-1 capitalize"
                                    >
                                        <img
                                            class="w-3.5 h-3.5"
                                            src="/icons/heart.svg"
                                            alt="Add"
                                        />
                                        {reduceNumber(h.info.favorite)}
                                    </p>
                                </div>
                            </a>
                        </article>
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
            </section>
        {/if}
    {/if}
</main>

<style lang="sass">
    .collection
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))

        @screen sm
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))

    .favorite-center
        min-height: calc(100vh - 4vh - 64px - 64px - 36px - 34px - 32px) !important

        @screen md
            min-height: calc(100vh - 64px - 64px - 36px - 34px - 32px) !important

    $expo-out: cubic-bezier(.16,1,.3,1)

    .liftable
        & > .cover
            @apply rounded-xl overflow-hidden
            box-shadow: 0
            transition: box-shadow .375s $expo-out, transform .375s $expo-out

        &:hover,
        &:focus
            & > .cover
                @apply transform -translate-y-4
                transform: scale(1.025) translateY(-0.75rem)
                box-shadow: 0 4px 8px rgba(0, 0, 0, .1)
</style>
