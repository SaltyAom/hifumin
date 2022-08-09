<script lang="ts">
    import type { Cover } from '@gql'
    import Image from './image.svelte'

    export let hentai: Cover
    export let empasize = true

    $: ({
        title: { display },
        images: {
            cover: {
                link,
                info: { width, height }
            }
        },
        metadata: { language },
        info: { favorite, amount }
    } = hentai)

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

<a class="liftable" sveltekit:prefetch href="/h/{hentai.id}">
    <article class="article flex flex-col gap-2 w-full">
        <div class="cover rounded-2xl border dark:border-gray-700 liftable">
            <div class="image overflow-hidden">
                <Image src={link.replace("cover", "1t")} {width} {height} />
            </div>
        </div>

        <header class="flex flex-1 flex-col gap-1 text-gray-400 text-sm w-full">
            <div class="flex flex-row w-full">
                <h5 class="inline-flex items-center flex-1 {empasize ? "text-gray-600 dark:text-gray-400 text-lg font-medium" : "text-base"}">
                    {display}
                </h5>
            </div>

            <div class="flex flex-row justify-between gap-1 md:gap-1.5">
                <p
                    class="flex flex-[5] sm:flex-[4] items-center gap-1 capitalize"
                >
                    <img
                        class="w-3.5 h-3.5"
                        src="/icons/language.svg"
                        alt="Add"
                    />
                    {mapLanguage(language)}
                </p>
                <p class="flex flex-[4] items-center gap-1 capitalize">
                    <img
                        class="w-3.5 h-3.5"
                        src="/icons/book-open.svg"
                        alt="Add"
                    />
                    {amount}
                </p>
                <p class="flex flex-[4] items-center gap-1 capitalize">
                    <img class="w-3.5 h-3.5" src="/icons/heart.svg" alt="Add" />
                    {reduceNumber(favorite)}
                </p>
            </div>
        </header>
    </article>
</a>

<style lang="sass">
    $expo-out: cubic-bezier(.16,1,.3,1)

    .liftable
        & > .article > .cover
            @apply rounded-xl overflow-hidden
            box-shadow: 0
            transition: box-shadow .375s $expo-out, transform .375s $expo-out

        &:hover,
        &:focus
            & > .article > .cover
                @apply transform -translate-y-4
                transform: scale(1.025) translateY(-0.75rem)
                box-shadow: 0 4px 8px rgba(0, 0, 0, .1)
</style>
