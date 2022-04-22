<script lang="ts">
    import { onMount } from 'svelte'

    import user, { isAuthed } from '$lib/stores/user'
    import { isServer } from '$lib/utils'

    onMount(async () => {
        if (isServer) return

        try {
            const res = await fetch('https://user.hifumin.app/auth/refresh', {
                credentials: 'include'
            })

            if (res.status !== 200) return

            const name = await res.text()

            $user = {
                name
            }
        } catch (_error) {
        } finally {
            $isAuthed = true
        }
    })
</script>
