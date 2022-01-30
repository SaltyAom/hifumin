<script lang="ts">
    import type { NhqlSearchData } from '$lib/gql/nhqlSearch'
    import AddCollection from './add-collection.svelte'

    import Image from './image.svelte'

    export let hentai: NhqlSearchData
    export let isLast = false

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

<article class="flex flex-col gap-2 w-full">
    <a sveltekit:prefetch href="/h/{hentai.id}">
        <div class="cover rounded-3xl border dark:border-gray-700">
            <div class="image overflow-hidden">
                <Image
                    src={hentai.images.cover.link}
                    width={hentai.images.cover.info.width}
                    height={hentai.images.cover.info.height}
                />
            </div>
        </div>
    </a>

    <header class="flex flex-1 flex-col gap-1 text-gray-400 text-sm w-full">
        <div class="flex flex-row w-full">
            <h5 class="inline-flex items-center flex-1 text-base">
                {hentai.title.display}
            </h5>
            <AddCollection
                parentClass="{isLast
                    ? '!justify-end'
                    : ''}"
                id={hentai.id}
            />
        </div>

        <div class="flex flex-row justify-between gap-1 md:gap-1.5">
            <p class="flex flex-[5] sm:flex-[4] items-center gap-1 capitalize">
                <img class="w-3.5 h-3.5" src="/icons/language.svg" alt="Add" />
                {mapLanguage(hentai.metadata.language)}
            </p>
            <p class="flex flex-[4] items-center gap-1 capitalize">
                <img class="w-3.5 h-3.5" src="/icons/book-open.svg" alt="Add" />
                {hentai.info.amount}
            </p>
            <p class="flex flex-[4] items-center gap-1 capitalize">
                <img class="w-3.5 h-3.5" src="/icons/heart.svg" alt="Add" />
                {reduceNumber(hentai.info.favorite)}
            </p>
        </div>
    </header>
</article>

<style lang="sass">
    $expo-out: cubic-bezier(.16,1,.3,1)

    .cover
        @apply overflow-hidden
        transition: border-radius .48s $expo-out

        & > .image
            transition: transform .48s $expo-out

        &:hover,
        &:focus
            @apply rounded-xl

            & > .image
                transform: scale(1.075)
                // box-shadow: 0 2px 8px rgba(66, 39, 39, .12), 0 4px 12px rgb(0 0 0 / 12%)
</style>
