import { FunctionComponent } from 'react'

import { useStoreon } from 'storeon/react'
import { MasonryEvent, MasonryStore } from '@stores'

import { Book } from '@components'
import { PreloadGallery } from '..'

import { splitChunk } from '@libs'
import { useInfiniteHentai } from '@libs/hooks'

import { Stories } from '@types'

interface Props {
	initial: Stories
}

const RecommendedGallery: FunctionComponent<Props> = ({
	initial
}) => {
	let { margin, masonry } = useStoreon<MasonryStore, MasonryEvent>(
		'margin',
		'masonry'
	)

	// ? Pass down an initial story from Incremental Static Regeneration.
	let [galleries] = useInfiniteHentai(initial)

	if (!galleries.length)
		return <PreloadGallery />

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
					<Book preload />
					<Book preload />
				</div>
			))}
		</main>
	)
}

export default RecommendedGallery
