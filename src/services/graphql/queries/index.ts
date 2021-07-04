import { query } from '..'

import {
	GET_HENTAI_READER_BY_ID,
	GET_PREVIEWS_QUERY,
	GET_SINGLE_PREVIEW_QUERY
} from './constants'

import type {
	GetHentaiById,
	GetHentaiByIdVariables,
	SearchHentai,
	SearchHentaiVariables
} from './types'

const removeTypeName = <T extends Object>(object: T): T =>
	JSON.parse(
		JSON.stringify(object, (key, value) => {
			if (key === '__typename') return undefined

			return value
		})
	)

export const getPreviews = ({ keyword, page = 1 }: SearchHentaiVariables) =>
	query<SearchHentai, SearchHentaiVariables>(GET_PREVIEWS_QUERY, {
		keyword,
		page
	})
		.toPromise()
		.then(removeTypeName)

export const getSinglePreviewById = ({ id }: GetHentaiByIdVariables) =>
	query<GetHentaiById, GetHentaiByIdVariables>(GET_SINGLE_PREVIEW_QUERY, {
		id
	})
		.toPromise()
		.then(removeTypeName)

export const getHentaiReaderById = ({ id }: GetHentaiByIdVariables) =>
	query<GetHentaiById, GetHentaiByIdVariables>(GET_HENTAI_READER_BY_ID, {
		id
	})
		.toPromise()
		.then(removeTypeName)
