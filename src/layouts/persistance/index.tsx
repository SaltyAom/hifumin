import { useCallback, useEffect, useMemo } from 'react'
import type { FunctionComponent } from 'react'

import { useAtom } from 'jotai'
import { bookmarkAtomBase } from '@stores/bookmark'
import { settingsAtom, ThemeMode } from '@stores/settings'
import { getHistory, historyAtomBase } from '@stores/history'
import { knownStoriesAtomBase } from '@stores/knownStory'

import tw, { combine } from '@tailwind'

export const PersistanceProvider: FunctionComponent = ({ children }) => {
	let [settings, updateSettings] = useAtom(settingsAtom)
	let [, updateHistory] = useAtom(historyAtomBase)
	let [, updateBookmark] = useAtom(bookmarkAtomBase)
	let [, updateKnownStory] = useAtom(knownStoriesAtomBase)

	let { themeMode } = useMemo(() => settings, [settings])

	let applyTheme = useCallback(
		(theme: ThemeMode = themeMode) => {
			let { documentElement: html } = document

			html.className = theme === ThemeMode.dark ? combine('dark', tw`dark`) : ''
		},
		[themeMode]
	)

	let themeAdapter = useCallback(
		({ matches }: Pick<MediaQueryListEvent, 'matches'>) => {
			applyTheme(matches ? ThemeMode.dark : ThemeMode.light)
		},
		[]
	)

	useEffect(() => {
		let persistedSettings = localStorage.getItem('settings')
		if (persistedSettings) updateSettings(JSON.parse(persistedSettings))

		updateHistory(getHistory())

		let persistedBookmark = localStorage.getItem('bookmark')
		if (persistedBookmark) updateBookmark(JSON.parse(persistedBookmark))

		let persistedStories = localStorage.getItem('story')
		if (persistedStories) updateKnownStory(JSON.parse(persistedStories))

		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', themeAdapter, {
				passive: true
			})
	}, [])

	useEffect(() => {
		if (themeMode === ThemeMode.adaptive)
			applyTheme(
				window.matchMedia('(prefers-color-scheme: dark)').matches
					? ThemeMode.dark
					: ThemeMode.light
			)
		else applyTheme()
	}, [themeMode])

	return <>{children}</>
}
