import Setting from "./constant"

export interface SettingStore {
	safeMode: boolean
	fullCensor: boolean
	useDefaultPreference: boolean
	preference: string[]
	useDefaultFilter: boolean
	filter: string[]
}

export interface SettingEvent {
	[Setting.SAFE_MODE]: boolean
	[Setting.FULL_CENSOR]: boolean
	[Setting.DEFAULT_PREFERENCE]: boolean
	[Setting.ADD_PREFERENCE]: string
	[Setting.REMOVE_PREFERENCE]: string
	[Setting.SET_PREFERENCE]: string[]
	[Setting.UPDATE_DEFAULT_FILTER]: boolean
	[Setting.ADD_FILTER]: string
	[Setting.REMOVE_FILTER]: string
	[Setting.SET_FILTER]: string[]
}
