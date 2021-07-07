import { useCallback, useEffect, useMemo } from 'react'
import type { FunctionComponent } from 'react'

import { useRouter } from 'next/router'

import { useAtom } from 'jotai'
import { bookmarkAtomBase } from '@stores/bookmark'
import { settingsAtom, ThemeMode } from '@stores/settings'
import { getHistory, historyAtomBase } from '@stores/history'
import { knownStoriesAtomBase } from '@stores/known-story'
import { themeAtom } from '@stores/theme'
import {
	SettingPage,
	settingPageAtom,
	SettingPagePath
} from '@stores/setting-page'

import tw, { combine } from '@tailwind'

import { enumToArrayValue } from '@services/array'

let paths = enumToArrayValue<SettingPage>(SettingPage).map(
	(key) => SettingPagePath[key]
)

const PersistanceProvider: FunctionComponent = ({ children }) => {
	let [settings, updateSettings] = useAtom(settingsAtom)
	let [, updateHistory] = useAtom(historyAtomBase)
	let [, updateBookmark] = useAtom(bookmarkAtomBase)
	let [, updateKnownStory] = useAtom(knownStoriesAtomBase)
	let [, updateTheme] = useAtom(themeAtom)
	let [, updateSettingPage] = useAtom(settingPageAtom)

	let { themeMode } = useMemo(() => settings, [settings])

	let { asPath } = useRouter()

	let applyTheme = useCallback(
		(theme: ThemeMode = themeMode) => {
			let { documentElement: html } = document

			updateTheme(theme)

			html.className =
				theme === ThemeMode.dark ? combine('dark', tw`dark`) : ''
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

		let persistedSettingPage = localStorage.getItem(
			'settingPage'
		) as keyof typeof SettingPage
		if (persistedSettingPage) updateSettingPage(persistedSettingPage)

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

	useEffect(() => {
		if (!asPath.startsWith('/settings')) return

		let settingType = (asPath.split('/')[2] ?? '').replace('-', ' ')

		if (!paths.includes(settingType)) return

		let page = SettingPage[
			paths.indexOf(settingType)
		] as keyof typeof SettingPage

		localStorage.setItem('settingPage', page)
		updateSettingPage(page)
	}, [asPath])

	return <>{children}</>
}

export default PersistanceProvider
