<script lang="ts">
    import { page } from '$app/stores'

    import { darkTheme } from '@stores/settings'

    let asPath = $page.url.pathname

    let name = 'Hifumin'
    let twitterDevAccount = '@saltyAom'

    export let id = 0
    export let title = 'Hifumin: hentai doujinshi and manga'
    export let alternativeTitle = []
    export let description =
        'Find 6 digits code without ads. Find and read hentai doujinshi and manga from 6 digits withouts ads, fast and safe.'
    export let author = ''
    export let icon = '/assets/icon/icon.png'
    export let createdAt: number | null = null
    export let image = {
        info: {
            width: 1920,
            height: 1080
        },
        link: 'https://hifumin.app/assets/images/cover.jpg'
    }
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta name="author" content={author} />
    <link rel="icon" href={icon} />
    <link rel="shortcut icon" href={icon} />
    <link rel="canonical" href={`https://hifumin.app${asPath}`} />
    <meta
        name="keyword"
        content={`${title},${
            alternativeTitle.length ? `${alternativeTitle.join(',')},` : ''
        }${author},Hifumin,nhentai${id ? `,${id}` : ''}`}
    />

    {#if createdAt}
        <meta
            property="article:published_time"
            content={new Date(createdAt * 1000).toLocaleDateString()}
        />
    {/if}

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="article:author" content={author} />
    <meta property="og:site_name" content={name} />
    <meta property="og:image" content={image.link} />
    <meta property="og:image:width" content={image.info.width.toString()} />
    <meta property="og:image:height" content={image.info.height.toString()} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`https://hifumin.app${asPath}`} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content={twitterDevAccount} />
    <meta name="twitter:image" content={image.link} />
    <meta name="twitter:creator" content={twitterDevAccount} />

    <meta name="theme-color" content={$darkTheme ? '#1f2937' : '#ffffff'} />
</svelte:head>
