import { Story } from '@types'

export const splitChunk = <T extends any[]>(
	data: T,
	chunk: number
): Array<T> => {
	let newChunk: T[] = Array(chunk).fill(Array())

	data.forEach((data, index) => {
		let column = index % chunk

		// @ts-ignore
		newChunk[column] = [...newChunk[column], data]
	})

	return newChunk
}

export const filterTag = (galleries: Story[], filter: string[]) =>
		galleries.filter(
			(story) =>
				!story.metadata.tags.find((tag) => filter.includes(tag.name))
		),
	filterPreference = (galleries: Story[], preference: string[]) =>
		galleries.filter(
			(story) =>
				story.metadata.tags.find((tag) => preference.includes(tag.name))
		)
