import { error } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'
import { hentaiById } from '@gql'
import { collectionCover, collectionPage } from '@services'
import { getFavoriteHentais } from '@gql'

export const load: Load = async ({ params: { id }, setHeaders }) => {
    const collectionId = +id

    if (Number.isNaN(collectionId) || collectionId < 1) throw error(404)

    const [collection, hentaiIds] = await Promise.all([
        collectionCover(collectionId),
        collectionPage(collectionId)
    ])

    if (!hentaiIds[0])
        return {
            preview: undefined,
            id: collectionId,
            initFavorite: [],
            collection
        }

    const [favorite, previewData] = await Promise.all([
        getFavoriteHentais(hentaiIds),
        hentaiById(hentaiIds[0])
    ])

    const preview = previewData?.images.pages[0]

    setHeaders({
        'cache-control': 'public, max-age=3600'
    })

    return {
        preview,
        id: collectionId,
        initFavorite: favorite,
        collection
    }
}
