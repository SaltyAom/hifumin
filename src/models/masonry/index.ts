import { StoreonModule } from 'storeon'

import { getMasonry, getMasonryMargin } from '@services'

import Masonry from './constant'
import { MasonryStore, MasonryEvent } from './types'

const masonry: StoreonModule<MasonryStore, MasonryEvent> = (store) => {
	store.on('@init', () => {
		let totalMasonry = getMasonry()

		return {
			masonry: getMasonry(),
			margin: getMasonryMargin(totalMasonry)
		}
	})

	store.on(Masonry.update, (_, action) => action)
}

export type { MasonryStore, MasonryEvent }
export default masonry
