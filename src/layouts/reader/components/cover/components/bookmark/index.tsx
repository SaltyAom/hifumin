import { useCallback } from 'react'

import { useAtom } from 'jotai'
import { bookmarkAtom } from '@stores'

import { Bookmark as BookmarkIcon } from 'react-feather'

import { twClass } from '../styles'
import { BookmarkComponent } from './types'

export const Bookmark: BookmarkComponent = ({ story }) => {
	let { id } = story

	let [bookmarks, toggleBookmark] = useAtom(bookmarkAtom)
	let included = bookmarks.includes(id)

	let handleBookmark = useCallback(() => {
		toggleBookmark(story)
	}, [id])

	return (
		<button
			type="button"
			className={twClass.button}
			onClick={handleBookmark}
		>
			<BookmarkIcon
				className={twClass.contentIcon}
				fill={included ? 'currentColor' : 'transparent'}
			/>
			Bookmark
		</button>
	)
}
