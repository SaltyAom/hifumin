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

export const getPreviews = ({ keyword, page = 1 }: SearchHentaiVariables) =>
	query<SearchHentai, SearchHentaiVariables>(GET_PREVIEWS_QUERY, {
		keyword,
		page
	}).toPromise()

export const getSinglePreviewById = ({ id }: GetHentaiByIdVariables) =>
	query<GetHentaiById, GetHentaiByIdVariables>(GET_SINGLE_PREVIEW_QUERY, {
		id
	}).toPromise()

export const getHentaiReaderById = ({ id }: GetHentaiByIdVariables) =>
	query<GetHentaiById, GetHentaiByIdVariables>(GET_HENTAI_READER_BY_ID, {
		id
	}).toPromise()
