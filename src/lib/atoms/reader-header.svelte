<script lang="ts">
    import Image from '$lib/atoms/image.svelte'
    import AddCollection from '$lib/atoms/add-collection.svelte'

    import TranslateIcon from '$lib/icons/translate.svelte'

    import type { NhqlByIdData } from '$lib/gql/nhqlById'

    import { BookOpenIcon, HeartIcon, Edit2Icon } from 'svelte-feather-icons'

    export let nhql: NhqlByIdData
</script>

<header
    class="z-20 flex flex-col md:flex-row items-center gap-8 w-11/12 md:w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-3xl"
>
    <div class="w-full md:min-w-[300px] md:max-w-[300px]">
        <Image
            src={nhql.images.cover.link}
            alt={nhql.title.display}
            parentClass="rounded-xl shadow-2xl overflow-hidden"
            width={nhql.images.cover.info.width}
            height={nhql.images.cover.info.height}
            autoReload
        />
    </div>

    <section class="flex flex-col gap-2">
        <header class="flex flex-col gap-1">
            <h6 class="text-sm text-gray-400 dark:text-gray-500">{nhql.id}</h6>
            <h1 class="text-2xl text-gray-800 dark:text-gray-300">
                {nhql.title.display}
            </h1>
        </header>

        <section
            class="flex items-center gap-1 text-gray-700 dark:text-gray-400 capitalize"
        >
            <Edit2Icon size="18" />
            {#each nhql.metadata.artists as artist (artist.name)}
                <a href="/search/{artist.name}">
                    {artist.name} ({artist.count})
                </a>
            {/each}
        </section>

        <div class="flex flex-col gap-2 text-gray-500 dark:text-gray-400">
            <h5 class="flex items-center gap-1 capitalize">
                <TranslateIcon class="w-5 h-5" />
                {nhql.metadata.language}
            </h5>
            <div class="flex justify-between items-center gap-2">
                <h5 class="flex min-w-[6ch] items-center gap-1.5 capitalize">
                    <BookOpenIcon size="18" />
                    {nhql.info.amount}
                </h5>
                <h5 class="flex flex-1 items-center gap-1 capitalize">
                    <HeartIcon size="18" />
                    {!Intl
                        ? nhql.info.favorite
                        : Intl.NumberFormat().format(nhql.info.favorite)}
                </h5>
            </div>
        </div>

        <div class="flex items-center text-gray-400 gap-2">
            <AddCollection
                parentClass="relative !justify-start"
                class="border dark:border-gray-600 !my-2"
                dialogClass="!left-0"
                id={nhql.id}
                title="Add to..."
            />
            <button
                class="flex justify-center items-center gap-2 h-8 px-2 border dark:border-gray-600 rounded-full hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700 transition-colors"
                title="Find translation"
            >
                <TranslateIcon class="w-5.5 h-5.5 p-0.5" />
                Translate
            </button>
        </div>

        <h4 class="text-gray-500 dark:text-gray-400">
            {nhql.metadata.tags.length} tags:
        </h4>

        <div
            class="flex flex-wrap w-full gap-1 md:max-h-[15ch] overflow-x-hidden overflow-y-auto snap-y snap-mandatory"
        >
            {#each nhql.metadata.tags as { name } (name)}
                <a
                    class="text-gray-700 dark:text-gray-400 px-2 py-1 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700 border dark:border-gray-600 rounded-full snap-start transition-colors"
                    href={`/search/${name}`}>{name}</a
                >
            {/each}
        </div>
    </section>
</header>
