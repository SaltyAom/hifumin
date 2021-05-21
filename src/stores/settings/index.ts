import { atom } from 'jotai'
import { merge } from '@stores/operations'

import {
	historyActions,
	HistoryAtomReducer
} from './history'
import type { Histories, KnownStories } from './history'

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
	histories: Histories
	knownStories: KnownStories

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
		histories: [],
		knownStories: {},
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

interface HistoryAtom {
	histories: Histories
	knownStories: KnownStories
}

export const historyAtom = atom<HistoryAtom, HistoryAtomReducer>(
	(get) => {
		let { histories, knownStories } = get(settingsAtom)

		return {
			histories,
			knownStories
		}
	},
	(get, set, { type, story }) => {
		set(settingsAtom, historyActions[type](story, get(historyAtom)))
	}
)

interface HistoryAtomSetterReducer {
	histories: Histories
	knownStories: KnownStories
}

export const historyAtomSetter = atom<null, HistoryAtomSetterReducer>(
	null,
	(_, set, args) => {
		set(settingsAtom, args)
	}
)
