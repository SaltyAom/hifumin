/* eslint-disable react/no-array-index-key */
import { useStoreon } from 'storeon/react'
import { MasonryEvent, MasonryStore } from '@models'

import { Book } from '@components'

import { splitChunk } from '@services'

import styles from '@styles/landing.module.sass'

const PreloadGallery = () => {
	let { margin, masonry } = useStoreon<MasonryStore, MasonryEvent>(
		'margin',
		'masonry'
	)

	return (
		<>
			{splitChunk(Array(25).fill(0), masonry).map((column, index) => (
				<div
					key={index}
					className={styles.masonry}
					style={{ marginTop: margin[index] }}
				>
					{column.map((_, _index) => (
						<Book key={_index} preload />
					))}
					<Book preload />
					<Book preload />
				</div>
			))}
		</>
	)
}

export default PreloadGallery
