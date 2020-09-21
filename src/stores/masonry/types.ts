export interface MasonryStore {
	masonry: number
	margin: string[]
}

export interface MasonryEvent {
	UPDATE_LAYOUT: MasonryStore
}
