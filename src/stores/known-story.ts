/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import { atom } from 'jotai'

import type { Story } from '@types'
import { historyAtom } from './history'

import { bookmarkAtom } from './bookmark'

export type KnownStory = ReturnType<typeof composeKnownStory>
export type KnownStories = Record<number, KnownStory>

type HistoryActionFunction = (
	story: KnownStory,
	knownStories: KnownStories
) => KnownStories

export enum KnownStoriesActions {
	add,
	remove
}

export const addKnownStories: HistoryActionFunction = (story, knownStories) => {
	if (knownStories[story.id]) return knownStories

	let newKnownStories = { ...knownStories }

	newKnownStories[story.id] = story

	localStorage.setItem('story', JSON.stringify(newKnownStories))

	return newKnownStories
}

export const removeKnownStories: HistoryActionFunction = (
	story,
	knownStories
) => {
	if (!knownStories[story.id]) return knownStories

	let { [story.id]: removed, ...newKnownStories } = knownStories

	localStorage.setItem('story', JSON.stringify(newKnownStories))

	return newKnownStories
}

export const knownStoriesActions = {
	[KnownStoriesActions.add]: addKnownStories,
	[KnownStoriesActions.remove]: removeKnownStories
} as const

export const knownStoriesAtomBase = atom<KnownStories, KnownStories>(
	[],
	(_, set, stories) => {
		set(knownStoriesAtomBase, stories)
	}
)

export const knownStoriesAtom = atom<KnownStories, KnownStory>(
	(get) => get(knownStoriesAtomBase),
	(get, set, story) => {
		let histories = get(historyAtom)
		let bookmark = get(bookmarkAtom)
		let knownHistories = get(knownStoriesAtomBase)

		let { id } = story

		let notExisted =
			histories.some((history) => history.id === id) ||
			bookmark.includes(story.id)

		if (notExisted)
			return set(
				knownStoriesAtomBase,
				addKnownStories(story, knownHistories)
			)

		let needPurge =
			!histories.some((history) => history.id === id) &&
			!bookmark.includes(story.id)

		if (needPurge)
			return set(
				knownStoriesAtomBase,
				removeKnownStories(story, knownHistories)
			)
	}
)

export const composeKnownStory = (story: Story) => {
	let {
		id,
		title: { display },
		images: {
			cover: {
				link,
				info: { width, height }
			}
		},
		info: { amount, favorite },
		metadata: {
			tags,
			artist: { name }
		}
	} = story

	return {
		id,
		title: {
			display
		},
		images: {
			cover: {
				link,
				info: {
					width,
					height
				}
			}
		},
		info: {
			favorite,
			amount
		},
		metadata: {
			artist: {
				name
			},
			tags: tags.map(({ name }) => ({ name }))
		}
	}
}
