import Link from 'next/link'

import { SearchEvent, SearchStore } from '@models'
import { useStoreon } from 'storeon/react'
import { Search } from '@models/constant'

import TagContainer from './container'

import './tag.sass'

import { TagComponent } from './types'

const Tag: TagComponent = ({ children, preload = false, style = {} }) => {
	const { dispatch } = useStoreon<SearchStore, SearchEvent>()

	const updateSearch = () => {
		if(!children)
			return

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
