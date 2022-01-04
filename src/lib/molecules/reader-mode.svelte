<script lang="ts">
    import { ReaderType } from '$lib/stores/settings'

    import { ColumnsIcon, MousePointerIcon } from 'svelte-feather-icons'

    import ReaderButton from '../atoms/reader-button.svelte'
</script>

<section class="flex justify-end items-center max-w-2xl w-full my-3 mx-auto px-2 md:px-0">
    <div class="flex items-center gap-1 text-gray-400">
        <ReaderButton type={ReaderType.scroll} label="Scroll">
            <ColumnsIcon class="w-8 transform rotate-90" />
        </ReaderButton>
        <ReaderButton type={ReaderType.interactive} label="Interactive">
            <MousePointerIcon class="w-8" />
        </ReaderButton>
    </div>
</section>
