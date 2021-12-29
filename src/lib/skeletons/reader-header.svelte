<script lang="ts">
    import {
        GlobeIcon,
        BookOpenIcon,
        HeartIcon,
        PenToolIcon
    } from 'svelte-feather-icons'
</script>

<header
    class="z-20 flex flex-col md:flex-row items-center gap-8 w-11/12 md:w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-3xl"
>
    <div class="w-full md:min-w-[300px]">
        <figure
            class="w-full md:[w-300px] rounded-xl shadow-2xl overflow-hidden bg-gray-5"
            style="padding-bottom: 145%"
        />
    </div>

    <section class="flex flex-col gap-2">
        <h6 class="w-16 h-5 bg-gray-100 rounded" />
        <h1 class="w-3/4 h-8 bg-gray-200 rounded" />

        <h4 class="flex items-center gap-1 text-gray-700 capitalize mt-2">
            <PenToolIcon size="21" />
            <div class="w-24 h-5 bg-gray-200 rounded" />
        </h4>

        <div class="flex flex-col gap-1.5 text-gray-500 my-2">
            <h5 class="flex items-center gap-1 capitalize">
                <GlobeIcon size="21" />
                <div class="w-24 h-5 bg-gray-200 rounded" />
            </h5>
            <h5 class="flex items-center gap-1 capitalize">
                <BookOpenIcon size="21" />
                <div class="w-9 h-5 bg-gray-200 rounded" />
            </h5>
            <h5 class="flex items-center gap-1 capitalize">
                <HeartIcon size="21" />
                <div class="w-16 h-5 bg-gray-200 rounded" />
            </h5>
        </div>

        <h4 class="text-gray-500">
            <div class="w-16 h-6 bg-gray-100 rounded" />
        </h4>

        <div
            class="flex flex-wrap w-full gap-1 md:max-h-[17.5ch] overflow-x-hidden overflow-y-auto snap-y snap-mandatory"
        >
            {#each Array(12).fill(0) as _, index (index)}
                <a
                    class="bg-gray-100 h-7 px-2 py-1 rounded-sm snap-start"
                    style="width:{Math.random() * 40 + 90}px"
                />
            {/each}
        </div>
    </section>
</header>
