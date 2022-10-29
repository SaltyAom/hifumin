<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { goto } from '$app/navigation'

    import Dialog from './dialog.svelte'

    const dispatch = createEventDispatcher()

    const close = () => {
        dispatch('close')
    }
</script>

<Dialog
    title="Member only feature"
    action="Sign In"
    on:close={close}
>
    Sign in to Hifumin to sync data between devices, create and share collection, and more exclusive features
    <a 
        slot="whole-action" 
        sveltekit:prefetch href="/signin"
        class="text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/15 font-medium px-4 py-2 rounded-lg"
    >
        Sign In
    </a>
</Dialog>
