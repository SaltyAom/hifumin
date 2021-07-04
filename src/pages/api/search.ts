import type { NextApiRequest, NextApiResponse } from 'next'

import { getPreviews } from '@services/graphql'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let {
		body: { keyword, page }
	} = req

	let fetched = await getPreviews({
		keyword,
		page
	})

	let hentais = fetched.data?.searchHentai.data ?? []

	return res.status(200).json(hentais)
}
