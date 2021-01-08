import { FunctionComponent } from 'react'

import { useStoreon } from 'storeon/react'
import { MasonryEvent, MasonryStore } from '@models'

import { Book } from '@components'

import { splitChunk } from '@services'
import { useInfiniteHentai } from '@services/hooks'

import { Stories } from '@types'

import PreloadGallery from '../preload'

interface Props {
	initial: Stories
}

const RecommendedGallery: FunctionComponent<Props> = ({ initial }) => {
	let { margin, masonry } = useStoreon<MasonryStore, MasonryEvent>(
		'margin',
		'masonry'
	)

	// ? Pass down an initial story from Incremental Static Regeneration.
	let [galleries] = useInfiniteHentai(initial)

	if (!galleries.length) return <PreloadGallery />

	return (
		<>
			{splitChunk(galleries, masonry).map((column, index) => (
				<div
					// eslint-disable-next-line react/no-array-index-key
					key={index}
					className="masonry"
					style={{ marginTop: margin[index] }}
				>
					{column.map((story) => (
						<Book
							key={story.id}
							story={story}
						/>
					))}
					<Book preload />
					<Book preload />
				</div>
			))}
		</>
	)
}

export default RecommendedGallery
