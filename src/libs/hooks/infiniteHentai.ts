import { useEffect, useReducer, useState, useRef, useCallback } from 'react'

import { tags, randomPick, fetch } from '@libs'

import { Stories } from '@types'

const useInfiniteHentai = (initState: Stories) => {
	let [galleries, updateGalleries] = useState(initState)

	// ? Incremental Static Regeneration already pre-render page 1. Start from 2 on client.
	let [page, updatePage] = useState(2),
		// ? nhentai API limit query from landing page data. Use random data from tag instead.
		[shouldLoadFromTag, startLoadingFromTag] = useReducer(
			() => true,
			false
		),
		[shouldFetchMore, fetchMore] = useReducer((state) => state + 1, 0)

	let persistedListener = useRef<() => void>(),
		isLoading = useRef(false),
		loadedTag = useRef<string[]>([]),
		isInitial = useRef(true)

	let lazyListener = useCallback(
		(tag = '') => {
			if (isLoading.current) return

			if (
				document.body.scrollHeight - window.innerHeight * 3.5 >=
				pageYOffset
			)
				return

			fetchMore()

			if (!shouldLoadFromTag) return updatePage(page + 1)

			loadedTag.current = [...loadedTag.current, tag]

			if (loadedTag.current.length < tags.length) return

			// ? Load tag from next page
			loadedTag.current = []
			updatePage(page + 1)
		},
		[page, shouldLoadFromTag]
	)

	let fetchStories = useCallback(
		(randomTag: string[]) => {
			isLoading.current = true

			fetch(
				`https://nhapi.now.sh/search/${
					shouldLoadFromTag ? randomTag : 'page'
				}/${page}`
			)
				.then((newGalleries: Stories) => {
					updateGalleries([...galleries, ...newGalleries])
				})
				.catch(() => {
					if (shouldLoadFromTag) return

					// ? Reset page to 1 to start query from tags.
					updatePage(1)
					startLoadingFromTag()
				})
				.finally(() => {
					isLoading.current = false
				})
		},
		[shouldLoadFromTag, galleries]
	)

	useEffect(() => {
		if (shouldLoadFromTag) updatePage(1)
	}, [shouldLoadFromTag])

	useEffect(() => {
		let randomTag = randomPick(
			tags.filter((tag) => !loadedTag.current.includes(tag))
		)

		if (!isLoading.current)
			if (isInitial.current) isInitial.current = false
			else fetchStories(randomTag)

		let stopListener = () =>
				window.removeEventListener('scroll', persistedListener.current),
			listener = () => lazyListener(randomTag)

		if (persistedListener.current) stopListener()

		persistedListener.current = listener

		window.addEventListener('scroll', listener, {
			passive: true
		})

		return () => stopListener()
	}, [shouldFetchMore])

	return [galleries]
}

export default useInfiniteHentai
