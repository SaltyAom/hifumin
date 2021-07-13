import type { NextApiRequest, NextApiResponse } from 'next'

import { getSimiliarHentaiById } from '@services/graphql'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let {
		query: { id }
	} = req

	let story = await getSimiliarHentaiById({ id: +id })

	res.status(200).json(story.data?.getHentaiById || null)
}
