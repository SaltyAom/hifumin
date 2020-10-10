import { StoreonModule } from 'storeon'

import { setPersist } from '@libs'

import { SettingStore, SettingEvent } from './types'

const Setting: StoreonModule<SettingStore, SettingEvent> = (store) => {
	store.on('@init', () => ({
		safeMode: false,
		fullCensor: false,
		useDefaultPreference: true,
		preference: []
	}))

	store.on('UPDATE_SAFE_MODE', (store, safeMode) => {
		setPersist('safeMode', safeMode)

		return {
			...store,
			safeMode
		}
	})

	store.on('UPDATE_FULL_CENSOR', (store, fullCensor) => {
		setPersist('fullCensor', fullCensor)

		return {
			...store,
			fullCensor
		}
	})

	store.on('UPDATE_DEFAULT_PREFERENCE', (store, useDefaultPreference) => {
		setPersist('useDefaultPreference', useDefaultPreference)

		return {
			...store,
			useDefaultPreference
		}
	})

	store.on('ADD_PREFERENCE', (store, newPreference) => {
		let preference = [...store.preference, newPreference]

		setPersist('preference', preference)

		return {
			...store,
			preference
		}
	})

	store.on('REMOVE_PREFERENCE', (store, removePreference) => {
		let preference = store.preference.filter(
			(preference) => preference !== removePreference
		)

		setPersist('preference', preference)

		return {
			...store,
			preference
		}
	})

	store.on('SET_PREFERENCE', (store, preference) => {
		return {
			...store,
			preference
		}
	})
}

export type { SettingStore, SettingEvent }
export default Setting
