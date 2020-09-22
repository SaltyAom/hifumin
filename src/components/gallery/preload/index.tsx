import { Fragment } from 'react'

import { useStoreon } from 'storeon/react'
import { MasonryEvent, MasonryStore } from '@stores'

import { Book } from '@components'

import { splitChunk } from '@libs'

const PreloadGallery = () => {
	let { margin, masonry } = useStoreon<MasonryStore, MasonryEvent>(
		'margin',
		'masonry'
	)

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
}

export default PreloadGallery