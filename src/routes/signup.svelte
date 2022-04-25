<script lang="ts">
    import { goto } from '$app/navigation'

    import ProgressIndicator from '$lib/atoms/progress-indicator.svelte'

    import user from '$lib/stores/user'
    import { isServer } from '$lib/utils'

    let email: string
    let username: string
    let password: string
    let confirmPassword: string

    let isLoading = false
    let error = ''
    let complete = false

    $: {
        if (!isServer && $user) goto('/')
    }

    const signUp = async () => {
        if (!email || !username || !password || !confirmPassword) return
        if (username.length < 5)
            return (error = 'Username need to have atleast 5 characters')
        if (password.length < 8)
            return (error = 'Password need to havee atleast 8 characters')
        if (password !== confirmPassword)
            return (error = "Passwords don't match")

        if (isLoading) return
        isLoading = true
        error = ''

        try {
            const success = await fetch(
                'https://user.hifumin.app/auth/signup',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        email
                    })
                }
            ).then((res) => res.status === 200)

            if (!success) throw new Error('Sign up failed')

            complete = true
        } catch (err) {
            error = 'User is already exists or email is already in used'
        } finally {
            isLoading = false
        }
    }
</script>

<main
    class="flex flex-col justify-center items-center w-full max-w-xs min-h-app p-4 mx-auto"
>
    {#if complete}
        <img
            class="w-[64px] h-[64px]"
            src="/assets/icon/icon.png"
            alt="Hifumin's icon"
        />
        <h1 class="text-3xl text-gray-700 dark:text-gray-200 font-medium mt-3">
            Complete
        </h1>
        <h2
            class="text-lg text-gray-400 font-light text-center italic mt-1"
            title="- Plato"
        >
            "The first victory is to conquer self"
        </h2>

        <p class="w-full text-gray-500 dark:text-gray-400 text-lg mt-6">
            Welcome to Hifumin! <br /> Your sign up is now complete.
        </p>
        <p class="w-full text-gray-500 dark:text-gray-400 text-lg my-4">
            To get start, simply sign in and please confirm your email later.
        </p>

        <a
            class="text-white text-center text-xl font-medium bg-blue-500 dark:bg-blue-600 w-full mt-2 py-3 rounded-lg gap-4 blue-shadow"
            href="/signin">Sign In</a
        >
    {:else}
        <img
            class="w-[64px] h-[64px]"
            src="/assets/icon/icon.png"
            alt="Hifumin's icon"
        />
        <h1 class="text-3xl text-gray-700 dark:text-gray-200 font-medium mt-3">
            Sign Up
        </h1>
        <h2
            class="text-lg text-gray-400 font-light text-center italic mt-1"
            title="- Plato"
        >
            "The first victory is to conquer self"
        </h2>

        <form
            on:submit|preventDefault={signUp}
            class="flex flex-col w-full mt-6 mb-4"
        >
            <label for="email" class="text-sm text-gray-400 mb-0.5">Email</label
            >
            <input
                id="email"
                type="email"
                inputmode="email"
                name="email"
                placeholder="Email"
                bind:value={email}
                required
                class="text-lg text-gray-700 dark:text-gray-100 w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded outline-none mb-6"
            />

            <label for="username" class="text-sm text-gray-400 mb-0.5"
                >Username</label
            >
            <input
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                bind:value={username}
                required
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
                required
                class="text-lg text-gray-700 dark:text-gray-100 w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded outline-none mb-6"
            />

            <label for="confirm-password" class="text-sm text-gray-400 mb-0.5"
                >Confirm Password</label
            >
            <input
                id="confirm-password"
                type="password"
                name="password"
                placeholder="Confirm Password"
                bind:value={confirmPassword}
                required
                class="text-lg text-gray-700 dark:text-gray-100 w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded outline-none mb-4"
            />

            {#if error}
                <p class="text-red-500 font-medium">{error}</p>
            {/if}

            <button
                class="flex justify-center items-center text-white text-xl font-medium bg-blue-500 dark:bg-blue-600 w-full mt-4 py-3 rounded-lg gap-4 blue-button"
                disabled={isLoading}
                >Sign Up
                {#if isLoading}
                    <ProgressIndicator class="!w-7 !h-7 !m-0" stroke="#fff" />
                {/if}
            </button>
        </form>

        <h2 class="text-sm text-gray-400 mt-1 mb-6" title="- P Vergilius Maro">
            Already have an account? <a href="/signin" class="underline"
                >Sign in</a
            >
        </h2>
    {/if}
</main>
