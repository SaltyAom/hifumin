import { useState, useCallback, useEffect } from 'react'

import { isNhentai } from '@services/validation'
import { getSinglePreviewById } from '@services/graphql/queries'

import { Story } from '@types'

export const useSinglePreview = (id: number) => {
	let [hentai, updateHentai] = useState<Story>()
	let [isLoading, setLoading] = useState(false)
	let [error, updateError] = useState('')
	let [isEnd, updateIsEnd] = useState(false)

	useEffect(() => {
		updateIsEnd(false)

		if (isNhentai(id)) fetchOne(id)
	}, [id])

	let fetchOne = useCallback(
		async (id: number) => {
			if (isLoading) return

			setLoading(true)

			let fetched = await getSinglePreviewById({ id })

			if (fetched.error || !fetched.data?.getHentaiById.success) {
				return updateError(
					fetched.error?.toString() ??
						fetched.data?.getHentaiById.error ??
						'Something went wrong'
				)
			}

			let hentai = fetched.data?.getHentaiById.data

			updateHentai(hentai!)
			updateIsEnd(true)
		},
		[id]
	)

	return { hentai, error, isLoading, isEnd }
}
