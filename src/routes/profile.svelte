<script lang="ts">
    import { goto } from '$app/navigation'

    import { ProgressIndicator } from '@shared'
    import { galahad } from '@services'
    import { user, isAuthed } from '@stores'

    import Cookies from 'js-cookie'

    let isLoading = false
    let error = ''

    const signOut = async () => {
        if (!user || isLoading) return

        isLoading = true
        error = ''

        try {
            const res = await fetch(`${galahad}/auth/signout`, {
                method: 'POST',
                credentials: 'include'
            })

            if (res.status !== 200) throw new Error('Sign out failed')

            Cookies.remove('persistedName')

            location.href = '/'
        } catch {
            error =
                'Failed to sign out, please check your internet connection and try again'
        } finally {
            isLoading = false
        }
    }

    $: {
        if (isAuthed && !user) goto('/signin')
    }
</script>

<svelte:head>
    <meta name="robots" content="noindex" />
</svelte:head>

{#if !$isAuthed}
    <main class="flex justify-center items-center w-full h-app">
        <ProgressIndicator />
    </main>
{:else if !user}
    <main class="flex justify-center items-center w-full h-app">Login</main>
{:else}
    <main
        class="flex flex-col items-center w-full max-w-sm mx-auto px-4 pb-4 pt-16"
    >
        <div
            class="block w-[96px] h-[96px] bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden"
        >
            <img
                class="w-full h-full object-center object-cover"
                src="/assets/images/cat.webp"
                alt="Cat"
            />
        </div>
        <h1 class="text-2xl text-gray-700 dark:text-gray-200 font-medium mt-4">
            {$user.name}
        </h1>

        <div class="w-full my-6 h-[1px] bg-gray-100 dark:bg-gray-700" />

        <button
            class="flex justify-center items-center gap-3 text-lg font-medium text-red-500 px-6 py-2 rounded-lg bg-red-50 dark:bg-red-500/15"
            on:click={signOut}
        >
            Sign Out
            {#if isLoading}
                <ProgressIndicator
                    class="!w-6 !h-6"
                    stroke="rgba(239, 68, 68)"
                />
            {/if}
        </button>

        {#if error}
            <p class="text-red-500 text-center font-medium my-4">
                {error}
            </p>
        {/if}
    </main>
{/if}
