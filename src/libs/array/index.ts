export const splitChunk = <T extends any[]>(
	data: T,
	chunk: number
): Array<T> => {
	let newChunk: Array<T> = Array(chunk).fill(Array())

	data.forEach((data, index) => {
		let column = index % chunk

		// @ts-ignore
		newChunk[column] = [...newChunk[column], data]
	})

	return newChunk
}
