import { useState, useRef, useCallback } from 'react'

import { getPreviews, query } from '@services/graphql'
import type { SearchHentai, SearchHentaiVariables } from '@services/graphql'

// import { tags } from '@services/data'
import { copy } from '@services/array'
import { randomBetween } from '@services/random'

import type { Stories } from '@types'

type UseHentaiCollection = (initial: Stories) => [Stories, () => Promise<void>]

let tags = ['yuri', 'glasses']

export const useHentaiCollection: UseHentaiCollection = (initial) => {
	let [stories, updateStories] = useState(initial)

	let availableTag = useRef(copy(tags))
	let page = useRef(1)

	let randomTag = useCallback(() => {
		console.log(availableTag.current)

		if (availableTag.current.length === 0) {
			availableTag.current = copy(tags)
			page.current++
		}

		let tag = availableTag.current.splice(
			randomBetween(0, availableTag.current.length - 1),
			1
		)[0]

		return tag
	}, [])

	let getMoreHentai = useCallback(async () => {
		let fetched = await query<SearchHentai, SearchHentaiVariables>(
			getPreviews,
			{
				keyword: randomTag(),
				page: page.current
			}
		).toPromise()

		let newStories = fetched.data?.searchHentai.data ?? []

		if (newStories.length) updateStories(stories.concat(newStories))
	}, [stories])

	return [stories, getMoreHentai]
}
