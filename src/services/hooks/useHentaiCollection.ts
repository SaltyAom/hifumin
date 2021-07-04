import { useState, useRef, useCallback, useReducer } from 'react'

import { getPreviews } from '@services/graphql'

import { copy } from '@services/array'
import { randomBetween } from '@services/random'

import type { Stories } from '@types'

interface UseHentaiCollectionResult {
	stories: Stories
	fetchMore: () => Promise<void>
	isEnd: boolean
}

// eslint-disable-next-line no-unused-vars
type UseHentaiCollection = (initial: Stories) => UseHentaiCollectionResult
const tags = ['yuri', 'glasses']

const useHentaiCollection: UseHentaiCollection = (initial) => {
	let [stories, updateStories] = useState(initial)
	let [isEnd, setAsEnd] = useReducer(() => true, false)

	let availableTag = useRef(copy(tags))
	let page = useRef(1)

	let randomTag = useCallback(() => {
		if (availableTag.current.length === 0) {
			availableTag.current = copy(tags)
			page.current += 1
		}

		let [tag] = availableTag.current.splice(
			randomBetween(0, availableTag.current.length - 1),
			1
		)

		return tag
	}, [])

	let fetchMore = useCallback(async () => {
		let fetched = await getPreviews({
			keyword: randomTag(),
			page: page.current
		})

		let newStories = fetched.data?.searchHentai.data ?? []

		if (newStories.length) updateStories(stories.concat(newStories))
		else setAsEnd()
	}, [stories])

	return { stories, fetchMore, isEnd }
}

export default useHentaiCollection