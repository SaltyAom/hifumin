import { galahad } from '.'

export interface CollectionData {
    cover?: number
    id: number
    public: boolean
    title: string
}

const getCollectionList = (): Promise<CollectionData[]> =>
    fetch(`${galahad}/collection/list`, {
        credentials: 'include'
    }).then((r) => r.json())

export default getCollectionList
