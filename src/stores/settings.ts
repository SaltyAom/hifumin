import { useCallback } from 'react'

import { atom, useAtom } from 'jotai'
import { merge } from '@stores/operations'

import type { Enum } from '@services/array'

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
export const preferenceAtom = atom((get) => {
	let { preferenceList, useDefaultPreference, filterList, useDefaultFilter } =
		get(settingsAtom)

	return {
		preferenceList,
		useDefaultPreference,
		filterList,
		useDefaultFilter
	}
})

export const useSettings = () => {
	let [settings, updateSettings] = useAtom(settingsAtom)

	let updateDropDown = useCallback(
		<T extends Enum>(key: keyof SettingsAtom, enums: T) =>
			(selected: keyof T) => {
				updateSettings({
					[key]: enums[selected]
				})
			},
		[updateSettings]
	)

	let updateSwitch = useCallback(
		(key: keyof SettingsAtom) => (updated: boolean) => {
			updateSettings({
				[key]: updated
			})
		},
		[updateSettings]
	)

	let updateSetting = useCallback(
		<T extends keyof SettingsAtom>(key: T) =>
			(value: SettingsAtom[T]) => {
				updateSettings({
					[key]: value
				})
			},
		[updateSettings]
	)

	return { settings, updateDropDown, updateSwitch, updateSetting }
}
