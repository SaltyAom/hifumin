import { StoreonModule } from 'storeon'

import { SearchStore, SearchEvent } from './types'

const search: StoreonModule<SearchStore, SearchEvent> = (store) => {
	store.on('@init', () => ({ search: '', isLoading: false, isError: false }))

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
}

export type { SearchStore, SearchEvent }
export default search
