import { useEffect } from 'react'
import type { FunctionComponent } from 'react'

import { useAtom } from 'jotai'
import { bookmarkAtomBase } from '@stores/bookmark'
import { settingsAtom } from '@stores/settings'
import { getHistory, historyAtomBase } from '@stores/history'
import { knownStoriesAtomBase } from '@stores/knownStory'

export const PersistanceProvider: FunctionComponent = ({ children }) => {
	let [, updateSettings] = useAtom(settingsAtom)
	let [, updateHistory] = useAtom(historyAtomBase)
	let [, updateBookmark] = useAtom(bookmarkAtomBase)
	let [, updateKnownStory] = useAtom(knownStoriesAtomBase)

	useEffect(() => {
		let persistedSettings = localStorage.getItem('settings')
		if (persistedSettings) updateSettings(JSON.parse(persistedSettings))

		updateHistory(getHistory())

		let persistedBookmark = localStorage.getItem('bookmark')
		if (persistedBookmark) updateBookmark(JSON.parse(persistedBookmark))

		let persistedStories = localStorage.getItem('story')
		if (persistedStories) updateKnownStory(JSON.parse(persistedStories))
	}, [])

	return <>{children}</>
}
