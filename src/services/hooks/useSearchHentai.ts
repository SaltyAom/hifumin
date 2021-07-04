import { useEffect, useReducer, useState, useCallback, useMemo } from 'react'
import type { Reducer } from 'react'

import useSwr from 'swr'

import { jsonApiFetcher } from '@services/graphql'
import { isNhentai } from '@services/validation'

import type { Stories } from '@types'

const useSearchHentai = (keyword: string) => {
	let [stories, appendStories] = useReducer<Reducer<Stories, Stories>>(
		(currentStories, newStories) => currentStories.concat(newStories),
		[]
	)
	let [page, updatePage] = useState(0)
	let [isEnd, updateEnd] = useState(false)
	let { data: newStories = null, error } = useSwr<
		Stories,
		globalThis.RequestInit
	>(
		[
			useMemo(
				() => ({
					body: JSON.stringify({
						keyword,
						page
					})
				}),
				[keyword, page]
			)
		],
		jsonApiFetcher,
		{
			refreshInterval: 2000
		}
	)
	let isLoading = !error && !newStories

	let fetchMore = useCallback(() => {
		if(!isLoading)
			updatePage(page + 1)
	}, [page, isLoading])

	useEffect(() => {
		if (newStories) appendStories(newStories)
	}, [newStories])

	useEffect(() => {
		updateEnd(false)

		if (keyword && !isNhentai(keyword)) updatePage(0)
	}, [keyword])

	return {
		stories,
		isLoading,
		fetchMore,
		isEnd
	}
}

export default useSearchHentai
