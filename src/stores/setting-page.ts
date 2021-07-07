/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { atom } from 'jotai'

export enum SettingPage {
	Appearance,
	Performance,
	DataUsage,
	Preference,
	Filter
}

export const SettingPagePath: Record<SettingPage, string> = {
	[SettingPage.Appearance]: 'appearance',
	[SettingPage.Performance]: 'performance',
	[SettingPage.DataUsage]: 'data usage',
	[SettingPage.Preference]: 'preference',
	[SettingPage.Filter]: 'filter'
} as const

export const settingPageAtom = atom<keyof typeof SettingPage, keyof typeof SettingPage>(
	"Appearance",
	(get, set, page) => {
		set(settingPageAtom, page)
	}
)
