import { browser } from '$app/env'
import { galahad } from '.'

let _cache: Map<number, Map<number, number[]>> = new Map()

export const purgeCollectionPageCacheById = (id: number) => {
    _cache.delete(id)
}

export const purgeCollectionPageCache = () => {
    _cache = new Map()
}

const collectionPage = async (collectionId: number, page: number) => {
    const isInCacheCollection = _cache.has(collectionId)

    if (_cache.has(collectionId)) {
        const _collectionCache = _cache.get(page)

        if (_collectionCache && _collectionCache.has(page))
            return _collectionCache.get(page)
    }

    const data: number[] = await fetch(
        `${galahad}/collection/${collectionId}/hentai/${page}`,
        {
            credentials: 'include'
        }
    ).then((r) => r.json())

    if(browser)
        if (isInCacheCollection) {
            const _collectionCache = _cache.get(collectionId)

            _collectionCache.set(page, data)
        } else {
            const _map = new Map<number, number[]>()
            _map.set(page, data)

            _cache.set(collectionId, _map)
        }

    return data
}

export default collectionPage
