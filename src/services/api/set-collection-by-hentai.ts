import { galahad } from '.'

const setCollectionByHentai = async (
    hentaiId: number,
    body: {
        add: number[]
        remove: number[]
    }
): Promise<null | Error> => {
    try {
        const res = await fetch(`${galahad}/collection/set/${hentaiId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: 'include'
        })

        const data = await res.json()

        if (res.status !== 200)
            throw new Error(data.error || 'Something went wrong')
    } catch (error) {
        return error
    }
}

export default setCollectionByHentai
