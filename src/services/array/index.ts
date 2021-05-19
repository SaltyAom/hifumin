import { isNumberString } from '@services/validation'

export const copy = <T extends any>(arr: T[]): T[] => [...arr]

export const splitChunk = <T extends any[]>(
	data: T,
	chunk: number
): Array<T> => {
	let newChunk: T[] = Array(chunk).fill([])

	if(data)
		data.forEach((item, index) => {
			let column = index % chunk

			// @ts-ignore
			newChunk[column] = [...newChunk[column], item]
		})

	return newChunk
}

export interface Enum {
	[id: number]: string
}

export const enumToArrayDetail = <T = string>(enums: Enum) => {
	let arr: T[] = []

	Object.keys(enums).forEach((key: any) => {
		if (isNumberString(key)) arr.push(enums[key] as any)
	})

	return arr
}

export const enumToArrayValue = <T = string>(enums: Enum) => {
	let arr: T[] = []

	Object.keys(enums).forEach((key: any) => {
		if (!isNumberString(key)) arr.push(enums[key] as any)
	})

	return arr
}
