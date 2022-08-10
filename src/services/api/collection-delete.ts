import { galahad } from '.'

const deleteCollection = async (collectionId: number): Promise<undefined | Error> => {
    try {
        const res = await fetch(`${galahad}/collection/${collectionId}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        if (res.status !== 200)
            throw new Error(
                'Unable to delete collection, please try again later'
            )
    } catch (error) {
        return error
    }
}

export default deleteCollection
