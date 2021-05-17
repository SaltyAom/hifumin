import { createClient, defaultExchanges } from 'urql'

export const client = createClient({
	url: 'https://api.opener.studio/graphql',
    exchanges: defaultExchanges
})

export const { query } = client

export { getPreviews } from './query'

export type { GetHentaiById, SearchHentai, SearchHentaiVariables } from './types'