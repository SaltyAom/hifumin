export interface SettingStore {
	safeMode: boolean
	fullCensor: boolean
	useDefaultPreference: boolean
	preference: string[]
	useDefaultFilter: boolean
	filter: string[]
}

export interface SettingEvent {
	UPDATE_SAFE_MODE: boolean
	UPDATE_FULL_CENSOR: boolean
	UPDATE_DEFAULT_PREFERENCE: boolean
	ADD_PREFERENCE: string
	REMOVE_PREFERENCE: string
	SET_PREFERENCE: string[]
	UPDATE_DEFAULT_FILTER: boolean
	ADD_FILTER: string
	REMOVE_FILTER: string
	SET_FILTER: string[]
}
