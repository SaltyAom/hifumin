import { browser } from '$app/env'
import { galahad } from '.'

export interface CollectionData {
    cover?: number
    id: number
    public: boolean
    title: string
    _count: {
        hentai: number
    }
}

let _cache: Map<number, CollectionData> = new Map()
export const purgeCollectionListCache = () => {
    _cache = new Map()
}

const getCollectionList = async (batch: number) => {
    if (_cache.has(batch)) return _cache.get(batch)

    const result = await fetch(`${galahad}/collection/list/${batch}`, {
        credentials: 'include'
    }).then((r) => r.json())

    if (browser) _cache.set(batch, result)

    return result
}

export default getCollectionList
