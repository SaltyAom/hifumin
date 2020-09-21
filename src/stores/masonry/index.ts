import { StoreonModule } from 'storeon'

import { MasonryStore, MasonryEvent } from './types'

const masonry: StoreonModule<MasonryStore, MasonryEvent> = (store) => {
	store.on('@init', () => ({ masonry: 2, margin: ['0px', '80px'] }))

	store.on('UPDATE_LAYOUT', (store, action) => action)
}

export type { MasonryStore, MasonryEvent }
export default masonry
