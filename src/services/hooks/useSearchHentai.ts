import { useEffect, useReducer, useState, useCallback } from 'react'
import type { Reducer } from 'react'

import { getPreviews } from '@services/graphql'
import { isNhentai } from '@services/validation'

import { Stories } from '@types'

export const useSearchHentai = (keyword: string) => {
	let [stories, appendStories] = useReducer<Reducer<Stories, Stories>>(
		(currentStories, newStories) => currentStories.concat(newStories),
		[]
	)
	let [page, updatePage] = useState(1)
	let [isEnd, updateEnd] = useState(false)
	let [isLoading, setLoading] = useState(false)

	useEffect(() => {
		updatePage(1)
		updateEnd(false)

		if (keyword && !isNhentai(keyword)) fetchMore()
	}, [keyword])

	let fetchMore = useCallback(async () => {
		if (isLoading) return

		setLoading(true)

		let fetched = await getPreviews({
			keyword,
			page
		})

		let hentais = fetched.data?.searchHentai.data ?? []

		if (hentais.length) appendStories(hentais)
		else updateEnd(true)

		setLoading(false)
		updatePage(page + 1)
	}, [page, keyword])

	return {
		stories,
		isLoading,
		fetchMore,
		isEnd
	}
}
