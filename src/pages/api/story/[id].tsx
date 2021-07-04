import type { NextApiRequest, NextApiResponse } from 'next'

import { getHentaiReaderById } from '@services/graphql'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let {
		query: { id }
	} = req

	let story = await getHentaiReaderById({ id: +id })

	res.status(200).json(story.data?.getHentaiById || null)
}
