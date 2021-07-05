import { createClient, defaultExchanges } from 'urql'
import { retryExchange } from '@urql/exchange-retry'

const url = 'https://api.opener.studio/graphql'
const bridge = '/api/search'

export const client = createClient({
	url,
	exchanges: [
		retryExchange({
			initialDelayMs: 500,
			maxDelayMs: 3500,
			randomDelay: true,
			maxNumberAttempts: 3,
			retryIf: (err) => !!err
		}),
		...defaultExchanges
	]
})

export const apiFetcher = <T extends Object>(
	args: globalThis.RequestInit
): Promise<T> => fetch(bridge, args).then((res) => res.json())

export const jsonApiFetcher = <T extends Object>(
	args: globalThis.RequestInit
): Promise<T> =>
	apiFetcher({
		...args,
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		}
	})

export const { query } = client

export { getPreviews, getHentaiReaderById } from './queries'

export type {
	HentaiQuery,
	GetHentaiById,
	GetHentaiByIdVariables,
	SearchHentai,
	SearchHentaiVariables
} from './queries/types'

export default client