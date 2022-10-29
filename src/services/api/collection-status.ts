import { galahad } from '.'

export interface CollectionStatus {
    isFavorite: boolean
    collection: CollectionStatusData[]
}

export interface CollectionStatusData {
    id: number
    public: boolean
    title: string
    selected: boolean
}

const getCollectionStatus = (id: number): Promise<CollectionStatus> =>
    fetch(`${galahad}/collection/status/${id}`, {
        credentials: 'include'
    }).then((r) => r.json())

export default getCollectionStatus
