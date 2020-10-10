export interface SettingStore {
	safeMode: boolean
	fullCensor: boolean
	useDefaultPreference: boolean
	preference: string[]
}

export interface SettingEvent {
	UPDATE_SAFE_MODE: boolean
	UPDATE_FULL_CENSOR: boolean
	UPDATE_DEFAULT_PREFERENCE: boolean
	ADD_PREFERENCE: string
	REMOVE_PREFERENCE: string
	SET_PREFERENCE: string[]
}
