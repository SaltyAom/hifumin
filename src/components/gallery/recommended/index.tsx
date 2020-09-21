import { Fragment, FunctionComponent } from 'react'

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

const RecommendedGallery: FunctionComponent<Props> = ({ initial }) => {
	let { margin, masonry } = useStoreon<MasonryStore, MasonryEvent>(
		'margin',
		'masonry'
	)

	// ? Pass down an initial story from Incremental Static Regeneration.
	let [galleries] = useInfiniteHentai(initial)

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
					<Book preload />
					<Book preload />
				</div>
			))}
		</Fragment>
	)
}

export default RecommendedGallery
