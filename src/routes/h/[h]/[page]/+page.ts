import { error, type Load } from '@sveltejs/kit'

import { hentaiById } from '@gql'

export const load: Load = async ({ params, setHeaders }) => {
    const { h: _h, page: _page } = params
    const h = +_h
    const page = +_page

    if (Number.isNaN(h) || Number.isNaN(page) || +page < 1) throw error(400)

    const hentai = await hentaiById(+h)

    if (!hentai || +page > hentai.info.amount) throw error(400, 'Not Found')

    setHeaders({
        'cache-control': 'private; max-age=3600'
    })

    return {
        hentai,
        page
    }
}
