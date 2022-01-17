<script lang="ts">
    import supabase from '$lib/supabase'

    import user from '$lib/stores/user'

    const googleAuth = async () => {
        await supabase.auth.signIn({
            provider: 'google'
        })
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        localStorage.removeItem('collections')

        location.reload()
    }
</script>

<main
    class="flex flex-col justify-center items-center w-full max-w-xs h-app mx-auto gap-6 pt-16"
>
    <header class="flex flex-col items-center w-full gap-2">
        <h2 class="text-3xl font-medium text-gray-800 dark:text-gray-200">
            Hifumin
        </h2>
        <h3 class="font-light text-gray-600 dark:text-gray-400">Sign in</h3>
    </header>
    {#if !$user.name}
        <form
            class="flex justify-center p-6 dark:text-gray-300 rounded"
            on:submit|preventDefault={() => {}}
        >
            <button
                class="flex items-center gap-2 px-12 py-3 bg-gray-100 dark:bg-gray-700 font-medium rounded-full"
                on:click={googleAuth}
            >
                <svg
                    viewBox="0 0 24 24"
                    width="21"
                    height="21"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path
                            fill="#4285F4"
                            d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                        />
                        <path
                            fill="#34A853"
                            d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                        />
                        <path
                            fill="#EA4335"
                            d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                        />
                    </g>
                </svg>
                Sign in with Google
            </button>
        </form>
    {:else}
        <button on:click={signOut}>Sign Out</button>
    {/if}
    <footer class="flex flex-col items-center w-full gap-2">
        <h2 class="font-light text-sm text-center text-gray-500 dark:text-gray-500">
            Creating account on Hifumin assume that you agreed to Hifumin's
            terms and service.
        </h2>
    </footer>
</main>
