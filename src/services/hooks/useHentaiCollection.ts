import {
	useState,
	useRef,
	useCallback,
	useReducer,
	useMemo,
	useEffect
} from 'react'

import { useAtom } from 'jotai'
import { preferenceAtom } from '@stores/settings'

import type { CombinedError } from 'urql'

import { copy } from '@services/array'
import { randomBetween } from '@services/random'
import { tags as defaultPreference } from '@services/data'

import type { Stories } from '@types'

interface UseHentaiCollectionResult {
	stories: Stories
	fetchMore: () => Promise<void>
	isEnd: boolean
	isLoading: boolean
}

type UseHentaiCollection = (
	// eslint-disable-next-line no-unused-vars
	initial: Stories,
	// eslint-disable-next-line no-unused-vars
	error: CombinedError | null
) => UseHentaiCollectionResult

const useHentaiCollection: UseHentaiCollection = (initial, error = null) => {
	let [{ useDefaultPreference, preferenceList }] = useAtom(preferenceAtom)

	let tags = useMemo(
		() =>
			useDefaultPreference || !preferenceList.length
				? defaultPreference
				: preferenceList,
		[useDefaultPreference, preferenceList]
	)

	let [stories, updateStories] = useState(initial)
	let [isLoading, updateLoading] = useState(false)
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
	}, [tags])

	useEffect(() => {
		availableTag.current = copy(tags)
	}, [tags])

	useEffect(() => {
		if (error) setAsEnd()
	}, [error])

	let fetchMore = useCallback(async () => {
		updateLoading(true)
		let tag = randomTag()

		let newStories: Stories = await fetch(
			`/api/preview/${tag}/${page.current}`
		).then((res) => res.json())

		if (newStories) updateStories(stories.concat(newStories))
		else setAsEnd()

		updateLoading(false)
	}, [stories, tags])

	return { stories, fetchMore, isEnd, isLoading }
}

export default useHentaiCollection
