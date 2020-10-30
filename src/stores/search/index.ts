import { StoreonModule } from 'storeon'

import Search from './constant'
import { SearchStore, SearchEvent } from './types'

const search: StoreonModule<SearchStore, SearchEvent> = (store) => {
	store.on('@init', () => ({
		search: '',
		isLoading: false,
		isError: false,
		useCurrentSearch: false
	}))

	store.on(Search.UPDATE, (store, search) => ({
		search
	}))

	store.on(Search.LOADING, (store, isLoading) => ({
		...store,
		isLoading
	}))

	store.on(Search.ERROR, (store, isError) => ({
		...store,
		isError
	}))

	store.on(Search.USE_CURRENT, (store, useCurrentSearch) => ({
		...store,
		useCurrentSearch
	}))
}

export type { SearchStore, SearchEvent }
export default search
