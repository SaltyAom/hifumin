import Link from 'next/link'

import { SearchEvent, SearchStore } from '@stores'
import { useStoreon } from 'storeon/react'
import { Search } from '@stores/constant'

import TagContainer from './container'

import './tag.styl'

const Tag = ({ children = null, preload = false, style = {} }) => {
	const { dispatch } = useStoreon<SearchStore, SearchEvent>()

	const updateSearch = () => {
		dispatch(Search.UPDATE, children)
		dispatch(Search.USE_CURRENT, true)
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
