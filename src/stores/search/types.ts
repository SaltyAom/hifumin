export interface SearchStore {
	search: string
	isLoading: boolean
	isError: boolean
}

export interface SearchEvent {
	UPDATE_SEARCH: string
	UPDATE_IS_LOADING: boolean
	UPDATE_IS_ERROR: boolean
}
