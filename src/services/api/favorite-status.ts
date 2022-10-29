import { browser } from '$app/environment'
import { galahad } from '.'

export interface CollectionOverviewStatus {
    cover?: number
    _count: {
        collection: number
        favorites: number
    }
}

let _cache: CollectionOverviewStatus
export const purgeCollectionOverviewStatusCache = () => {
    _cache = undefined
}

export const collectionOverviewStatus =
    async (): Promise<CollectionOverviewStatus> => {
        if (_cache) return _cache

        const result = await fetch(`${galahad}/favorite/overview`, {
            credentials: 'include'
        }).then((r) => r.json())

        if (browser) _cache = result

        return result
    }

export default collectionOverviewStatus
