<script lang="ts">
    import Image from './image.svelte'
    import { GlobeIcon, BookOpenIcon, HeartIcon } from 'svelte-feather-icons'

    import type { NhqlSearchData } from '$lib/gql/nhqlSearch'

    export let hentai: NhqlSearchData
</script>

<a
    sveltekit:prefetch
    class="cover relative rounded-xl overflow-hidden"
    href={`/h/${hentai.id}`}
>
    <div
        class="detail z-10 absolute flex flex-col justify-end gap-1 w-full h-full text-white text-lg p-3"
    >
        <h4 class="text-xl font-medium">{hentai.title.display}</h4>

        <p class="flex items-center gap-1 capitalize">
            <GlobeIcon size="21" />
            {hentai.metadata.language}
        </p>

        <div class="flex justify-between">
            <p class="flex flex-1 items-center gap-1 capitalize">
                <BookOpenIcon size="21" />
                {hentai.info.amount}
            </p>
            <p class="flex flex-1 items-center gap-1 capitalize">
                <HeartIcon size="21" />
                {Intl.NumberFormat().format(hentai.info.favorite)}
            </p>
        </div>
    </div>
    <div class="image">
        <Image
            src={hentai.images.cover.link}
            width={hentai.images.cover.info.width}
            height={hentai.images.cover.info.height}
        />
    </div>
</a>

<style lang="sass">
    $expo-out: cubic-bezier(.16,1,.3,1)

    .cover
        transition: box-shadow .2s $expo-out

        & > .image
            transition: filter .2s $expo-out, transform .2s $expo-out

        & > .detail
            opacity: 0
            transform: translateY(24px)
            transition: opacity .16s ease-out, transform .16s ease-out

        &:hover,
        &:focus
            box-shadow: 0 4px 16px rgba(66, 39, 39, .24), 0 8px 25px rgb(0 0 0 / 24%)

            & > .image
                filter: brightness(.3)
                transform: scale(1.1)

            & > .detail
                transform: translateY(0)
                opacity: 1
</style>
