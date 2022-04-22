<script lang="ts">
    import { onMount } from 'svelte'

    import user, { isAuthed } from '$lib/stores/user'
    import { isServer } from '$lib/utils'

    import Cookie from 'js-cookie'

    onMount(async () => {
        if (isServer) return

        try {
            /**
             * This is only here to reduce refresh load from server.
             * The cookie acts as short-live cached data.
             *
             * ? Modifying this value doesn't affect authentication check
             * because permission is check by value of accessToken
             * */
            const persistedName = Cookie.get('persistedName')

            if (persistedName) {
                $user = {
                    name: persistedName
                }
                $isAuthed = true

                return
            }

            const res = await fetch('https://user.hifumin.app/auth/refresh', {
                credentials: 'include'
            })

            if (res.status !== 200) return

            const name = await res.text()

            // Will be here for 5 minutes
            Cookie.set('persistedName', name, {
                expires: new Date(Date.now() * 60 * 30)
            })

            $user = {
                name
            }
        } catch (_error) {
        } finally {
            $isAuthed = true
        }
    })
</script>
