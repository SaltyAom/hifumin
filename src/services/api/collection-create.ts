import { galahad } from '.'

interface CollectionBody {
    title: string
    public: boolean
}

interface CreateCollectionResponse {
    id: number
    uid: number
    title: string
    detail: string
    public: boolean
    created: Date
    updated: Date
}

const createCollection = async (
    body: CollectionBody
): Promise<CreateCollectionResponse | Error> => {
    try {
        const res = await fetch(`${galahad}/collection/new`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: 'include'
        })

        const data = await res.json()

        if (res.status !== 200)
            throw new Error(data.error || 'Something went wrong')

        return data
    } catch (error) {
        return error
    }
}

export default createCollection
