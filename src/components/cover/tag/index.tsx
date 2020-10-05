import Link from 'next/link'

import { SearchEvent, SearchStore } from '@stores'
import { useStoreon } from 'storeon/react'

import TagContainer from './container'

import './tag.styl'

const Tag = ({ children = null, preload = false, style = {} }) => {
	const { dispatch } = useStoreon<SearchStore, SearchEvent>()

	const updateSearch = () => {
		dispatch('UPDATE_SEARCH', children)
		dispatch('USE_CURRENT_SEARCH', true)
	}

	return (
		<Link href="/">
			<a
				aria-disabled={preload}
				className={`tag ${preload ? '-preload' : ''}`}
				style={style}
				onClick={updateSearch}
			>
				{children}
			</a>
		</Link>
	)
}

export { TagContainer }
export default Tag
