/* eslint-disable no-unused-vars */
import { atom } from 'jotai'

import dayjs from 'dayjs'

import type { Story } from '@types'

import { composeKnownStory, knownStoriesAtom } from './known-story'
import type { KnownStory } from './known-story'

export interface History {
	id: number
	time: number
}
export type Histories = History[]

// eslint-disable-next-line no-shadow
export enum HistoryActions {
	add,
	remove
}

type HistoryActionFunction = (
	story: KnownStory,
	histories: Histories
) => Histories

export const getHistory = (): Histories => {
	let histories: Histories = JSON.parse(
		localStorage.getItem('history') || '[]'
	)

	return histories
}

export const addHistory: HistoryActionFunction = (story, histories) => {
	let [last] = histories

	if (
		typeof last !== 'undefined' &&
		last.id === story.id &&
		dayjs().diff(dayjs(last.time), 'minute') < 10
	)
		return histories

	let newHistories = [...histories]

	newHistories = [
		{
			id: story.id,
			time: Date.now()
		},
		...newHistories
	]

	localStorage.setItem('history', JSON.stringify(newHistories))

	return newHistories
}

export const removeHistory: HistoryActionFunction = (story, histories) => {
	let newHistories = [...histories]
	let toRemoved = newHistories.find((history) => history.id === story.id!)

	if (toRemoved?.id) newHistories.splice(toRemoved.id, 1)

	localStorage.setItem('history', JSON.stringify(newHistories))

	return newHistories
}

export interface HistoryAtomReducer {
	type: HistoryActions
	story: Story
}

export const historyActions = {
	[HistoryActions.add]: addHistory,
	[HistoryActions.remove]: removeHistory
} as const

export const historyAtomBase = atom<Histories, Histories>(
	[],
	(_, set, histories) => {
		set(historyAtomBase, histories)
	}
)

export const historyAtom = atom<Histories, HistoryAtomReducer>(
	(get) => get(historyAtomBase),
	(get, set, { type, story }) => {
		let composedStory = composeKnownStory(story)

		set(
			historyAtomBase,
			historyActions[type](composedStory, get(historyAtom))
		)
		set(knownStoriesAtom, composedStory)
	}
)
