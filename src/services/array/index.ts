export const copy = <T extends any>(arr: T[]): T[] => [...arr]

export const splitChunk = <T extends any[]>(
	data: T,
	chunk: number
): Array<T> => {
	let newChunk: T[] = Array(chunk).fill([])

	data.forEach((item, index) => {
		let column = index % chunk

		// @ts-ignore
		newChunk[column] = [...newChunk[column], item]
	})

	return newChunk
}
