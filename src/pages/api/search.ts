import type { NextApiRequest, NextApiResponse } from 'next'

import { query } from '@services/graphql'
import { GET_PREVIEWS_QUERY } from '@services/graphql/queries/constants'
import type { SearchHentai, SearchHentaiVariables } from '@services/graphql'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let {
		body: { keyword, page }
	} = req

	let fetched = await query<SearchHentai, SearchHentaiVariables>(
		GET_PREVIEWS_QUERY,
		{
			keyword,
			page
		}
	).toPromise()

	let hentais = fetched.data?.searchHentai.data ?? []
	
	return res.status(200).json(hentais)
}
