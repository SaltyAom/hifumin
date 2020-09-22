import { createStoreon } from 'storeon'

import masonry, { MasonryStore, MasonryEvent } from './masonry'
import search, { SearchStore, SearchEvent } from './search'
import setting, { SettingStore, SettingEvent } from './setting'

const store = createStoreon<any>([masonry, search, setting])

export type {
	MasonryStore,
	MasonryEvent,
	SearchStore,
	SearchEvent,
	SettingStore,
	SettingEvent
}
export default store
