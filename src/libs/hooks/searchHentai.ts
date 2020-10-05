import { useEffect, useReducer, useState, useRef, useCallback } from 'react'

import { useStoreon } from 'storeon/react'
import { SearchEvent, SearchStore } from '@stores'

import { randomPick, fetch } from '@libs'

import { Stories } from '@types'

interface useSearchHentaiArgument {
	tags: string[]
	resetDeterminer: string | number
	searchKey: string
}

const useSearchHentai = ({
	tags,
	resetDeterminer,
	searchKey
}: useSearchHentaiArgument) => {
	let { dispatch, isError } = useStoreon<SearchStore, SearchEvent>('isError')

	let [galleries, updateGalleries] = useState<Stories>([]),
		[shouldReset, reset] = useReducer((count) => count + 1, 0)

	let [page, updatePage] = useState(1),
		[shouldFetchMore, fetchMore] = useReducer((state) => state + 1, 0)

	let persistedListener = useRef<() => void>(),
		isLoading = useRef(false),
		loadedTag = useRef<string[]>([]),
		previousFetch = useRef<AbortController>()
	// ? Initial isn't require because nothing has loaded.

	let lazyListener = useCallback(
		(tag = '') => {
			if (isLoading.current) return

			if (
				document.body.scrollHeight - window.innerHeight * 3.5 >=
				pageYOffset
			)
				return

			fetchMore()
			updatePage(page + 1)

			loadedTag.current = [...loadedTag.current, tag]

			if (loadedTag.current.length < tags.length) return

			// ? Load tag from next page
			loadedTag.current = []
			updatePage(page + 1)
		},
		[page, tags]
	)

	let fetchStories = useCallback(
		(randomTag: string[]) => {
			isLoading.current = true
			dispatch('UPDATE_IS_LOADING', true)

			let controller = new AbortController(),
				{ signal } = controller

			if (previousFetch.current) previousFetch.current.abort()

			previousFetch.current = controller

			fetch(`https://nhapi.now.sh/search/${randomTag}/${page}`, {
				signal
			})
				.then((newGalleries: Stories) => {
					if (newGalleries.length)
						return updateGalleries([...galleries, ...newGalleries])
				})
				.catch(() => {
					dispatch('UPDATE_IS_ERROR', true)
				})
				.finally(() => {
					isLoading.current = false
					dispatch('UPDATE_IS_LOADING', false)
				})

			return () => previousFetch.current.abort()
		},
		[galleries]
	)

	useEffect(() => {
		let randomTag = randomPick(
			tags.filter((tag) => !loadedTag.current.includes(tag))
		)

		if (!isLoading.current) fetchStories(randomTag)

		let stopListener = () =>
				window.removeEventListener('scroll', persistedListener.current),
			listener = () => lazyListener(randomTag)

		if (persistedListener.current) stopListener()

		persistedListener.current = listener

		window.addEventListener('scroll', listener, {
			passive: true
		})

		return () => stopListener()
	}, [shouldFetchMore, resetDeterminer, shouldReset])

	useEffect(() => {
		updatePage(1)
		updateGalleries([])
		dispatch('UPDATE_IS_ERROR', false)
	}, [resetDeterminer])

	useEffect(() => {
		if (isError) {
			reset()
			dispatch('UPDATE_IS_ERROR', false)
		}
	}, [searchKey, galleries])

	return [galleries]
}

export default useSearchHentai
