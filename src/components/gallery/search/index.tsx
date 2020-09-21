import { Fragment, useEffect, useReducer, useRef } from 'react'

import dynamic from 'next/dynamic'

import { useStoreon } from 'storeon/react'
import { SearchStore, SearchEvent, MasonryStore, MasonryEvent } from '@stores'

import { Book } from '@components'
import { PreloadGallery } from '..'

import { splitChunk } from '@libs'
import { useSearchHentai } from '@libs/hooks'

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
		tags: search.split(',').map((tag) => tag.trimLeft().trimRight()),
		resetDeterminer: shouldReset,
		searchKey: search
	})

	let previousSearch = useRef('')

	useEffect(() => {
		if (!search.includes(previousSearch.current)) reset()

		previousSearch.current = search
	}, [search])

	if (isError) return <NotFound />

	if (!galleries.length) return <PreloadGallery />

	return (
		<main id="gallery">
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
		</main>
	)
}

export default SearchGallery
