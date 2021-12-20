<script lang="ts">
    import Image from './image.svelte'
    import {
        GlobeIcon,
        BookOpenIcon,
        HeartIcon,
    } from 'svelte-feather-icons'

    import type { NhqlSearchData } from '$lib/gql/nhqlSearch'

    export let hentai: NhqlSearchData
</script>

<a class="cover relative rounded overflow-hidden" href={`/h/${hentai.id}`}>
    <div
        class="detail z-50 absolute flex flex-col justify-end gap-1 w-full h-full text-white text-lg p-3"
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
                {!Intl
                    ? hentai.info.favorite
                    : Intl.NumberFormat().format(hentai.info.favorite)}
            </p>
        </div>
    </div>
    <Image
        parentClass="image"
        src={hentai.images.cover.link}
        size={[hentai.images.cover.info.width, hentai.images.cover.info.height]}
    />
</a>
