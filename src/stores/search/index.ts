import { StoreonModule } from 'storeon'

import { SearchStore, SearchEvent } from './types'

const search: StoreonModule<SearchStore, SearchEvent> = (store) => {
	store.on('@init', () => ({
		search: '',
		isLoading: false,
		isError: false,
		useCurrentSearch: false
	}))

	store.on('UPDATE_SEARCH', (store, search) => ({
		search
	}))

	store.on('UPDATE_IS_LOADING', (store, isLoading) => ({
		...store,
		isLoading
	}))

	store.on('UPDATE_IS_ERROR', (store, isError) => ({
		...store,
		isError
	}))

	store.on('USE_CURRENT_SEARCH', (store, useCurrentSearch) => ({
		...store,
		useCurrentSearch
	}))
}

export type { SearchStore, SearchEvent }
export default search
