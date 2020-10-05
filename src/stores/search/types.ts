export interface SearchStore {
	search: string
	isLoading: boolean
	isError: boolean
	useCurrentSearch: boolean
}

export interface SearchEvent {
	UPDATE_SEARCH: string
	UPDATE_IS_LOADING: boolean
	UPDATE_IS_ERROR: boolean
	USE_CURRENT_SEARCH: boolean
}