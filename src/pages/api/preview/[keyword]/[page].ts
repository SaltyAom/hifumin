import type { NextApiRequest, NextApiResponse } from 'next'

import { getPreviews } from '@services/graphql'
import { isNumberString } from '@services/validation'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let {
		query: { keyword, page }
	} = req

	let story = await getPreviews({
		keyword: keyword as string,
		page: isNumberString(page as string) ? +page : 1
	})

	res.status(200).json(story.data?.searchHentai.data || null)
}
