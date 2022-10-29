import { galahad, purgeCollectionById } from '.'

export interface UpdateCollection {
    title?: string
    detail?: string
    public?: boolean
}

const updateCollection = async (
    id: number,
    body: UpdateCollection
): Promise<undefined | Error> => {
    try {
        await fetch(`${galahad}/collection/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        purgeCollectionById(id)
    } catch(error) {

        return error
    }
}

export default updateCollection
