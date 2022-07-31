import { galahad } from '.'

const updateFavoriteById = async (
    id: number,
    isFavorite: boolean
): Promise<boolean | Error> => {
    const method = isFavorite ? 'PUT' : 'DELETE'

    try {
        const res = await fetch(`${galahad}/favorite/id/${id}`, {
            method,
            credentials: 'include'
        })

        if (res.status !== 200) throw new Error('Failed to get favorite status')

        return isFavorite
    } catch (error) {
        return error
    }
}

export default updateFavoriteById
