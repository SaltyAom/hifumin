import { browser } from '$app/env'
import { galahad, type CollectionData } from '.'

export interface CollectionCover extends Omit<CollectionData, 'cover'> {
    owned: boolean
    updated: Date
}

let _cache: Map<number, CollectionCover> = new Map()

export const purgeCollectionCoverCacheById = (collectionId: number) => {
    _cache.delete(collectionId)
}

export const purgeCollectionCoverCache = () => {
    _cache = new Map()
}

const collectionCover = async (collectionId: number) => {
    if (_cache.has(collectionId)) return _cache.get(collectionId)

    const data = (await fetch(`${galahad}/collection/${collectionId}/hentai`, {
        credentials: 'include'
    }).then((res) => res.json())) as CollectionCover

    if (browser) _cache.set(collectionId, data)

    return data
}

export default collectionCover
