import Search from './constant'

export interface SearchStore {
	search: string
	isLoading: boolean
	isError: boolean
	useCurrentSearch: boolean
}

export interface SearchEvent {
	[Search.UPDATE]: string
	[Search.LOADING]: boolean
	[Search.ERROR]: boolean
	[Search.USE_CURRENT]: boolean
}