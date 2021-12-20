const cardWidth = 220

export const getTotalMasonry = (layout = 1920): number => {
    let width = layout - 64 - 48

    if (width < cardWidth) width = cardWidth

    let available: number

    if (width < 568) available = 2
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
