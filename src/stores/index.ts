import { createStoreon } from 'storeon'

import masonry, { MasonryStore, MasonryEvent } from './masonry'
import search, { SearchStore, SearchEvent } from './search'

const store = createStoreon<any>([masonry, search])

export type { MasonryStore, MasonryEvent, SearchStore, SearchEvent }
export default store
