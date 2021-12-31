<script lang="ts">
    import Image from '$lib/atoms/image.svelte'

    import type { NhqlByIdData } from '$lib/gql/nhqlById'

    import {
        GlobeIcon,
        BookOpenIcon,
        HeartIcon,
        PenToolIcon
    } from 'svelte-feather-icons'

    export let nhql: NhqlByIdData
</script>

<header
    class="z-20 flex flex-col md:flex-row items-center gap-8 w-11/12 md:w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-3xl"
>
    <div class="w-full md:min-w-[300px] md:max-w-[300px]">
        <Image
            intersected
            src={nhql.images.cover.link}
            alt={nhql.title.display}
            parentClass="rounded-xl shadow-2xl overflow-hidden"
            width={nhql.images.cover.info.width}
            height={nhql.images.cover.info.height}
            autoReload
        />
    </div>

    <section class="flex flex-col gap-2">
        <h6 class="text-sm text-gray-400">{nhql.id}</h6>
        <h1 class="text-2xl text-gray-800">{nhql.title.display}</h1>

        <h4 class="flex items-center gap-1 text-gray-700 capitalize mt-2">
            <PenToolIcon size="21" />
            {nhql.metadata.artist.name} ({nhql.metadata.artist.count})
        </h4>

        <div class="flex flex-col gap-1.5 text-gray-500 my-2">
            <h5 class="flex items-center gap-1 capitalize">
                <GlobeIcon size="21" />
                {nhql.metadata.language}
            </h5>
            <h5 class="flex items-center gap-1 capitalize">
                <BookOpenIcon size="21" />
                {nhql.info.amount}
            </h5>
            <h5 class="flex items-center gap-1 capitalize">
                <HeartIcon size="21" />
                {!Intl
                    ? nhql.info.favorite
                    : Intl.NumberFormat().format(nhql.info.favorite)}
            </h5>
        </div>

        <h4 class="text-gray-500">
            Tags ({nhql.metadata.tags.length})
        </h4>

        <div
            class="flex flex-wrap w-full gap-1 md:max-h-[17.5ch] overflow-x-hidden overflow-y-auto snap-y snap-mandatory"
        >
            {#each nhql.metadata.tags as { name } (name)}
                <a
                    class="bg-gray-100 px-2 py-1 rounded-sm snap-start"
                    href={`/search/${name}`}>{name}</a
                >
            {/each}
        </div>
    </section>
</header>
