import { StoreonModule } from 'storeon'

import { getMasonry, getMasonryMargin } from '@libs'

import { MasonryStore, MasonryEvent } from './types'

const masonry: StoreonModule<MasonryStore, MasonryEvent> = (store) => {
	store.on('@init', () => {
		let masonry = getMasonry()

		return {
			masonry: getMasonry(),
			margin: getMasonryMargin(masonry)
		}
	})

	store.on('UPDATE_LAYOUT', (store, action) => {
		return action
	})
}

export type { MasonryStore, MasonryEvent }
export default masonry
