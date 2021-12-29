<script lang="ts">
    import dayjs from 'dayjs'

    import Image from '$lib/atoms/image.svelte'

    import type { Comment } from '$lib/gql/nhqlComment'

    export let comment: Comment

    let {
        body,
        created,
        user: { username, avatar }
    } = comment
</script>

<article class="flex gap-4">
    <div class="min-w-10 w-10 h-10">
        <Image
            size={[40, 40]}
            src={avatar}
            class="object-cover object-center"
            parentClass="w-10 h-10 rounded-full overflow-hidden"
            alt={username}
        />
    </div>
    <section class="flex flex-col flex-1 gap-0.5 text-sm">
        <div class="flex gap-2 text-xs text-gray-400 font-light">
            <h6 class="text-gray-800 font-medium break-words">
                {username}
            </h6>
            {' • '}
            <time>{dayjs(created * 1000).format('D MMM YY')}</time>
        </div>
        <p class="text-gray-600 break-words">{body}</p>
    </section>
</article>
