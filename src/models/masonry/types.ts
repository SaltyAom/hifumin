import Masonry from './constant'

export interface MasonryStore {
	masonry: number
	margin: string[]
}

export interface MasonryEvent {
	[Masonry.update]: MasonryStore
}
