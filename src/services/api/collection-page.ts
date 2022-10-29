import { browser } from '$app/environment'
import { galahad } from '.'

let _cache: Map<number, Map<number, number[]>> = new Map()

export const purgeCollectionPageCacheById = (id: number) => {
    _cache.delete(id)
}

export const purgeCollectionPageCache = () => {
    _cache = new Map()
}

const collectionPage = async (collectionId: number, linkedId?: number) => {
    const isInCacheCollection = _cache.has(collectionId)

    if (_cache.has(collectionId)) {
        const _collectionCache = _cache.get(linkedId)

        if (_collectionCache && _collectionCache.has(linkedId))
            return _collectionCache.get(linkedId)
    }

    const endpoint = `${galahad}/collection/${collectionId}/hentai`

    const data: number[] = await fetch(
        linkedId
            ? `${endpoint}/${linkedId}`
            : endpoint,
        {
            credentials: 'include'
        }
    ).then((r) => r.json())

    if (browser)
        if (isInCacheCollection) {
            const _collectionCache = _cache.get(collectionId)

            _collectionCache.set(linkedId, data)
        } else {
            const _map = new Map<number, number[]>()
            _map.set(linkedId, data)

            _cache.set(collectionId, _map)
        }

    return data
}

export default collectionPage
