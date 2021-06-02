import { atom } from 'jotai'
import { merge } from '@stores/operations'

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

export enum CompressionType {
	native,
	compact,
	heavy,
	adaptive
}

export enum ReaderType {
	scroll,
	'left to right',
	'right to left'
}

export interface SettingsAtom {
	themeMode: ThemeMode
	safeMode: SafeMode

	compressionType: CompressionType
	readerType: ReaderType

	collectHistory: boolean

	useDefaultPreference: boolean
	preferenceList: string[]
	useDefaultFilter: boolean
	filterList: string[]
}

export const settingsAtom = atom<SettingsAtom, Partial<SettingsAtom>>(
	{
		themeMode: ThemeMode.adaptive,
		safeMode: SafeMode.disabled,
		compressionType: CompressionType.native,
		readerType: ReaderType.scroll,
		collectHistory: true,
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
export const imageCompressionAtom = atom(
	(get) => get(settingsAtom).compressionType
)
export const collectHistoryAtom = atom(
	(get) => get(settingsAtom).collectHistory
)
