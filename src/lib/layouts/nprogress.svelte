<script>
    import { navigating } from '$app/stores'

    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css'

    NProgress.configure({
        // Full list: https://github.com/rstacruz/nprogress#configuration
        minimum: 0.16,
    })

    $: {
        if ($navigating) NProgress.start()
        else NProgress.done()
    }
</script>
