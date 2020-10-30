import { StoreonModule } from 'storeon'

import { getMasonry, getMasonryMargin } from '@libs'

import Masonry from './constant'
import { MasonryStore, MasonryEvent } from './types'

const masonry: StoreonModule<MasonryStore, MasonryEvent> = (store) => {
	store.on('@init', () => {
		let masonry = getMasonry()

		return {
			masonry: getMasonry(),
			margin: getMasonryMargin(masonry)
		}
	})

	store.on(Masonry.update, (_, action) => {
		return action
	})
}

export type { MasonryStore, MasonryEvent }
export default masonry
