<script lang="ts">
    import { goto } from '$app/navigation'

    import ProgressIndicator from '$lib/atoms/progress-indicator.svelte'
    import user from '$lib/stores/user'
    import { isServer } from '$lib/utils'

    let username: string
    let password: string
    let isLoading = false
    let error = ''

    $: {
        if (!isServer && $user) goto('/')
    }

    const signIn = async () => {
        if (isLoading) return
        isLoading = true

        try {
            const res = await fetch('https://user.hifumin.app/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    username,
                    password
                })
            })

            if (res.status !== 200)
                throw new Error('Incorrect Username or Password')

            $user = {
                name: await res.text()
            }

            location.href = '/'
        } catch (err) {
            error = 'Incorrect Username or Password'
        } finally {
            isLoading = false
        }
    }
</script>

<main
    class="flex flex-col justify-center items-center w-full max-w-xs min-h-app p-4 mx-auto"
>
    <img
        class="w-[64px] h-[64px]"
        src="/assets/icon/icon.png"
        alt="Hifumin's icon"
    />
    <h1 class="text-3xl text-gray-700 dark:text-gray-200 font-medium mt-3">
        Sign In
    </h1>
    <h2
        class="text-lg text-gray-400 font-light italic mt-1"
        title="- P Vergilius Maro"
    >
        "Fortune favors the bold"
    </h2>

    <form
        on:submit|preventDefault={signIn}
        class="flex flex-col w-full mt-6 mb-4"
    >
        <label for="username" class="text-sm text-gray-400 mb-0.5"
            >Username</label
        >
        <input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            bind:value={username}
            class="text-lg text-gray-700 dark:text-gray-100 w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded outline-none mb-6"
        />

        <label for="password" class="text-sm text-gray-400 mb-0.5"
            >Password</label
        >
        <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            bind:value={password}
            class="text-lg text-gray-700 dark:text-gray-100 w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded outline-none mb-4"
        />

        {#if error}
            <p class="text-red-500 font-medium">{error}</p>
        {/if}

        <button
            class="flex justify-center items-center text-white text-xl font-medium bg-blue-500 dark:bg-blue-600 w-full mt-4 py-3 rounded-lg gap-4"
            disabled={isLoading}
            >Sign In
            {#if isLoading}
                <ProgressIndicator class="!w-7 !h-7 !m-0" stroke="#fff" />
            {/if}
        </button>
    </form>

    <h2 class="text-sm text-gray-400 mt-1 mb-6" title="- P Vergilius Maro">
        Don't have an account? <a href="/signup" class="underline">Sign up</a>
    </h2>
</main>
>
