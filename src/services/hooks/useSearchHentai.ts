import { useEffect, useReducer, useState, useCallback } from 'react'
import type { Reducer } from 'react'

import { isNhentai } from '@services/validation'

import { Stories } from '@types'

const useSearchHentai = (keyword: string) => {
	let [stories, appendStories] = useReducer<Reducer<Stories, Stories>>(
		(currentStories, newStories) => currentStories.concat(newStories),
		[]
	)
	let [page, updatePage] = useState(1)
	let [isEnd, updateEnd] = useState(false)
	let [isLoading, setLoading] = useState(false)

	let fetchMore = useCallback(async () => {
		if (isLoading || !keyword) return

		setLoading(true)

		let newStories: Stories = await fetch(
			`/api/preview/${keyword || 'yuri'}/${page}`
		).then((res) => res.json())

		if (newStories && newStories.length) appendStories(newStories)
		else updateEnd(true)

		setLoading(false)
		updatePage(page + 1)
	}, [page, keyword])

	useEffect(() => {
		updatePage(1)
		updateEnd(false)

		if (keyword && !isNhentai(keyword)) fetchMore()
	}, [keyword])

	return {
		stories,
		isLoading,
		fetchMore,
		isEnd
	}
}

export default useSearchHentai
