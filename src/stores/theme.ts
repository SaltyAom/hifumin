import { atom } from 'jotai'

import { ThemeMode } from './settings'

export const themeAtom = atom<ThemeMode, ThemeMode>(
	ThemeMode.light,
	(get, set, newTheme) => {
		set(themeAtom, newTheme)
	}
)
