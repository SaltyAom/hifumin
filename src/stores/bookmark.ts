import { atom } from 'jotai'

import { knownStoriesAtom } from './knownStory'

import type { Story } from '@types'

export const bookmarkAtomBase = atom<number[], number[]>(
	[],
	(_, set, bookmarks) => {
		set(bookmarkAtomBase, bookmarks)
	}
)

export const bookmarkAtom = atom<number[], Story>(
	(get) => get(bookmarkAtomBase),
	(get, set, story) => {
		let bookmarks = [...get(bookmarkAtom)]

		let { id } = story

		let index = bookmarks.indexOf(id)
		let isNew = index !== -1

		if (isNew) bookmarks.splice(index, 1)
		else bookmarks = [id, ...bookmarks]

		bookmarks = bookmarks.filter((bookmark) => bookmark)

		localStorage.setItem('bookmark', JSON.stringify(bookmarks))

		set(bookmarkAtomBase, bookmarks)
		set(knownStoriesAtom, story)
	}
)
