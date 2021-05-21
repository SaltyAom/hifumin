import type { Story } from '@types'

export interface History {
	id: number
	time: number
}
export type Histories = History[]
export type KnownStory = ReturnType<typeof composePersistsHistory>
export type KnownStories = Record<number, KnownStory>

interface HistoryActionResult {
	knownStories: KnownStories
	histories: Histories
}

type HistoryActionFunction = (
	story: KnownStory,
	persists: HistoryActionResult
) => HistoryActionResult

export const getHistory = (): HistoryActionResult => {
	let knownStories: KnownStories = JSON.parse(
		localStorage.getItem('story') || '{}'
	)

	let histories: Histories = JSON.parse(
		localStorage.getItem('history') || '[]'
	)

	return { knownStories, histories }
}

export const addHistory: HistoryActionFunction = (
	story,
	{ knownStories, histories }
) => {
	let newKnownStories = {
		...knownStories,
		[story.id!]: story
	}

	if (!knownStories[story.id!])
		localStorage.setItem('story', JSON.stringify(newKnownStories))

	let newHistories = histories.concat([
		{
			id: story.id!,
			time: Date.now()
		}
	])

	localStorage.setItem('history', JSON.stringify(newHistories))

	return { histories: newHistories, knownStories: newKnownStories }
}

export const removeHistory: HistoryActionFunction = (
	story,
	{ knownStories, histories }
) => {
	let { [story.id!]: removed, ...newKnownStories } = knownStories

	if (!knownStories[story.id!])
		localStorage.setItem('story', JSON.stringify(newKnownStories))

	let newHistories = [...histories]
	let toRemoved = newHistories.find((history) => history.id === story.id!)

	if (toRemoved?.id) newHistories.splice(toRemoved.id, 1)

	localStorage.setItem('history', JSON.stringify(newHistories))

	return { histories: newHistories, knownStories: newKnownStories }
}

export const composePersistsHistory = (story: Story) => {
	let {
		id,
		title: { display },
		images: {
			cover: {
				link,
				info: { width, height }
			}
		},
		info: { amount },
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

export enum HistoryActions {
	add,
	remove
}

export interface HistoryAtomReducer {
	type: HistoryActions
	story: KnownStory
}

export const historyActions = {
	[HistoryActions.add]: addHistory,
	[HistoryActions.remove]: removeHistory
} as const
