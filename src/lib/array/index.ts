export const randomBetween = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1) + min)
export const randomPick = <T>(data: T[]): T =>
    data[randomBetween(0, data.length - 1)]

const cardWidth = 220

export const getTotalMasonry = (layout = 0): number => {
    let width = layout - 64 - 48

    if (width < cardWidth) width = cardWidth

    let available: number

    if (width < 420) available = 2
    else if (width < 600) available = 3
    else if (width < 768) available = 3
    else available = Math.floor(width / cardWidth)

    return available
}

export const chunkHentai = <T extends unknown[]>(
    chunk: number,
    data: T
): Array<T> => {
    const newChunk: T[] = Array(chunk).fill([])

    if (data)
        data.forEach((item, index) => {
            const column = index % chunk

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            newChunk[column] = [...newChunk[column], item]
        })

    return newChunk
}
