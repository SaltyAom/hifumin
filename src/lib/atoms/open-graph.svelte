<script lang="ts">
    import { page } from '$app/stores'

    import { darkTheme } from '$lib/stores/settings'

    let asPath = $page.url.pathname

    let name = 'Hifumin'
    let twitterDevAccount = '@saltyAom'

    export let id = 0
    export let title = 'Hifumin: hentai doujinshi and manga'
    export let alternativeTitle = []
    export let description =
        'Find 6 digits code without ads, faster and clean design'
    export let author = ''
    export let icon = '/assets/icon/icon.png'
    export let createdAt: number | null = null
    export let image = {
        info: {
            width: 1920,
            height: 1080
        },
        link: '/assets/image/image.jpg'
    }
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta name="author" content={author} />
    <link rel="icon" href={icon} />
    <link rel="shortcut icon" href={icon} />
    <link rel="canonical" href={`https://atago.opener.studio${asPath}`} />
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
    <meta property="og:url" content={`https://atago.opener.studio${asPath}`} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content={twitterDevAccount} />
    <meta name="twitter:image" content={image.link} />
    <meta name="twitter:creator" content={twitterDevAccount} />

    <link rel="manifest" href="/assets/app/manifest.json" />
    <meta name="mobile-web-app-capable" content="yes" />

    <meta name="application-name" content="Hifumin" />
    <meta name="mssmarttagspreventparsing" content="true" />
    <meta name="msapplication-window" content="width=1366;height=768" />

    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="Hifumin" />
    <link rel="apple-touch-icon" href="/assets/app/icon/apple-icon.jpg" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-touch-fullscreen" content="yes" />

    <meta name="theme-color" content={$darkTheme ? '#1f2937' : '#ffffff'} />

    <link rel="preconnect" content="https://t.nhentai.net" />
    <link rel="preconnect" content="https://api.hifumin.app" />

    <meta http-equiv="Content-Security-Policy" content="script-src 'none'" />
</svelte:head>
