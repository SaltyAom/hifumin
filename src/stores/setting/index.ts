import { StoreonModule } from 'storeon'

import { setPersist } from '@libs'

import { SettingStore, SettingEvent } from './types'

const Setting: StoreonModule<SettingStore, SettingEvent> = (store) => {
	store.on('@init', () => ({
		safeMode: false,
		fullCensor: false,
		useDefaultPreference: true,
		preference: [],
		useDefaultFilter: true,
		filter: []
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
		let preference: string[] = [
			// @ts-ignore
			...new Set([...store.preference, newPreference.toLocaleLowerCase()])
		]

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

	store.on('UPDATE_DEFAULT_FILTER', (store, useDefaultFilter) => {
		setPersist('useDefaultFilter', useDefaultFilter)

		return {
			...store,
			useDefaultFilter
		}
	})

	store.on('ADD_FILTER', (store, newFilter) => {
		let filter: string[] = [
			// @ts-ignore
			...new Set([...store.filter, newFilter.toLocaleLowerCase()])
		]

		setPersist('filter', filter)

		return {
			...store,
			filter
		}
	})

	store.on('REMOVE_FILTER', (store, removeFilter) => {
		let filter = store.filter.filter((filter) => filter !== removeFilter)

		setPersist('filter', filter)

		return {
			...store,
			filter
		}
	})

	store.on('SET_FILTER', (store, filter) => {
		return {
			...store,
			filter
		}
	})
}

export type { SettingStore, SettingEvent }
export default Setting
