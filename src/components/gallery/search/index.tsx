import { Fragment, useEffect, useReducer, useRef } from 'react'

import dynamic from 'next/dynamic'

import { useStoreon } from 'storeon/react'
import { SearchStore, SearchEvent, MasonryStore, MasonryEvent } from '@models'

import { Book } from '@components'

import { splitChunk } from '@services'
import { useSearchHentai } from '@services/hooks'

const NotFound = dynamic(() => import('./notFound'))

const SearchGallery = () => {
	let { search, isError } = useStoreon<SearchStore, SearchEvent>(
			'search',
			'isError'
		),
		{ margin, masonry } = useStoreon<MasonryStore, MasonryEvent>(
			'margin',
			'masonry'
		)

	let [shouldReset, reset] = useReducer((count) => count + 1, 0)

	let [galleries] = useSearchHentai({
		tags: search.split(',').map((tag) => tag.trim()),
		resetDeterminer: shouldReset,
		searchKey: search
	})

	let previousSearch = useRef('')

	useEffect(() => {
		reset()

		previousSearch.current = search
	}, [search])

	if (isError) return <NotFound />

	if (!galleries.length)
		return (
			<Fragment>
				{splitChunk(Array(25).fill(0), masonry).map((column, index) => (
					<div
						key={index}
						className="masonry"
						style={{ marginTop: margin[index] }}
					>
						{column.map((_, index) => (
							<Book key={index} preload />
						))}
						<Book preload />
						<Book preload />
					</div>
				))}
			</Fragment>
		)

	return (
		<Fragment>
			{splitChunk(galleries, masonry).map((column, index) => (
				<div
					key={index}
					className="masonry"
					style={{ marginTop: margin[index] }}
				>
					{column.map((story, index) => (
						<Book key={index} story={story} />
					))}
					{!isError && (
						<Fragment>
							<Book preload />
							<Book preload />
						</Fragment>
					)}
				</div>
			))}
		</Fragment>
	)
}

export default SearchGallery
