import { galahad } from '.'

export interface CollectionData {
    cover?: string
    id: number
    public: boolean
    title: string
}

Response

export const getCollectionListFetch = (batch: number) =>
    fetch(`${galahad}/collection/list/${batch}`, {
        credentials: 'include'
    })

const getCollectionList = (batch: number): Promise<CollectionData[]> =>
    getCollectionListFetch(batch).then((r) => r.json())

export default getCollectionList
