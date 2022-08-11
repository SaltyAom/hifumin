<script lang="ts">
    import dayjs from 'dayjs'

    import { Image } from '@shared'
    import type { Comment } from '@gql'

    export let comment: Comment

    let {
        comment: body,
        created,
        user: { username, avatar }
    } = comment
</script>

<article class="flex gap-4 overflow-hididen text-ellipsis">
    <div class="min-w-10 w-10 h-10">
        <Image
            width={40}
            height={40}
            src={avatar}
            class="w-full h-full object-cover object-center"
            parentClass="w-10 h-10 h-full rounded-full overflow-hidden"
            alt={username}
            autoReload
        />
    </div>
    <section class="flex flex-col gap-0.5 text-sm break-words w-full max-w-full">
        <div
            class="flex gap-2 text-xs text-gray-400 dark:text-gray-500 font-light"
        >
            <h6 class="text-gray-800 dark:text-gray-400 font-medium overflow-hidden text-ellipsis">
                {username}
            </h6>
            {' • '}
            <time>{dayjs(created * 1000).format('D MMM YY')}</time>
        </div>
        <p
            class="text-gray-600 dark:text-gray-300 overflow-hidden text-ellipsis"
        >
            {body}
        </p>
    </section>
</article>
