import { error, type Load } from '@sveltejs/kit'
import { hentaiById } from '@gql'

export const load: Load = async ({ params, setHeaders }) => {
    const hentai = await hentaiById(+params.h)

    if (!hentai) throw error(404)

    setHeaders({
        'cache-control': 'private, max-age=3600'
    })

    return {
        hentai
    }
}
