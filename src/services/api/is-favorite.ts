import { galahad } from '.'

const isFavorite = (id: number): Promise<boolean> =>
    fetch(`${galahad}/favorite/id/${id}`, {
        credentials: 'include'
    })
        .then((r) => r.text())
        .then((r) => r === 'true')

export default isFavorite
