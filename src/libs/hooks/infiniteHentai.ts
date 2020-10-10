import { useEffect, useReducer, useState, useRef, useCallback } from 'react'

import { tags, randomPick, fetch } from '@libs'

import { Stories } from '@types'
import { useStoreon } from 'storeon/react'
import { SettingEvent, SettingStore } from '@stores'

const useInfiniteHentai = (initState: Stories) => {
	let { useDefaultPreference, preference } = useStoreon<
		SettingStore,
		SettingEvent
	>('useDefaultPreference', 'preference')

	let [galleries, updateGalleries] = useState(initState)

	let [page, updatePage] = useState(2),
		[shouldFetchMore, fetchMore] = useReducer((state) => state + 1, 0)

	let persistedListener = useRef<() => void>(),
		isLoading = useRef(false),
		loadedTag = useRef<string[]>([]),
		isInitial = useRef(true),
		previousFetch = useRef<AbortController>()

	const useTag = useDefaultPreference ? tags : preference

	let lazyListener = useCallback(
		(tag = '') => {
			if (isLoading.current) return

			if (
				document.body.scrollHeight - window.innerHeight * 3.5 >=
				pageYOffset
			)
				return

			fetchMore()

			loadedTag.current = [...loadedTag.current, tag]

			console.log(loadedTag.current.length, useTag.length)
			if (loadedTag.current.length < useTag.length) return

			// ? Load tag from next page
			loadedTag.current = []
			updatePage(page + 1)
		},
		[page, useTag]
	)

	let fetchStories = useCallback(
		(randomTag: string[]) => {
			isLoading.current = true

			let controller = new AbortController(),
				{ signal } = controller

			if (previousFetch.current) previousFetch.current.abort()

			previousFetch.current = controller

			fetch(`https://nhapi.now.sh/search/${randomTag}/${page}`, {
				signal
			})
				.then((newGalleries: Stories) => {
					updateGalleries([...galleries, ...newGalleries])
				})
				.finally(() => {
					isLoading.current = false
				})

			return () => previousFetch.current.abort()
		},
		[galleries]
	)

	useEffect(() => {
		let randomTag = randomPick(
			useTag.filter((tag) => !loadedTag.current.includes(tag))
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
	}, [shouldFetchMore, useTag])

	return [galleries]
}

export default useInfiniteHentai
