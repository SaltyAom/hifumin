import { atom } from 'jotai'
import { merge } from './operations'

export enum ThemeMode {
	adaptive,
	light,
	dark
}

export enum SafeMode {
	disabled,
	blur,
	opaque
}

export enum PageType {
	native,
	compact
}

export enum ReaderType {
	scroll,
	'left to right',
	'right to left'
}

export interface SettingsAtom {
	themeMode: ThemeMode
	safeMode: SafeMode

	pageType: PageType
	readerType: ReaderType

	collectHistory: boolean
	histories: number[]

	useDefaultPreference: boolean
	preferenceList: string[]
	useDefaultFilter: boolean
	filterList: string[]
}

export const settingsAtom = atom<SettingsAtom, Partial<SettingsAtom>>(
	{
		themeMode: ThemeMode.adaptive,
		safeMode: SafeMode.disabled,
		pageType: PageType.native,
		readerType: ReaderType.scroll,
		collectHistory: true,
		histories: [],
		useDefaultPreference: true,
		preferenceList: [],
		useDefaultFilter: true,
		filterList: []
	},
	(get, set, arg) => {
		let newSettings = merge(get(settingsAtom), arg)

		localStorage.setItem('settings', JSON.stringify(newSettings))

		set(settingsAtom, newSettings)
	}
)

export const safeModeAtom = atom((get) => get(settingsAtom).safeMode)
