export interface SettingStore {
	safeMode
	fullCensor
}

export interface SettingEvent {
	UPDATE_SAFE_MODE: boolean
	UPDATE_FULL_CENSOR: boolean
}
