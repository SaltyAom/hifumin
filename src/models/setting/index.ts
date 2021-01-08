import { StoreonModule } from 'storeon'

import { setPersist } from '@services'

import { SettingStore, SettingEvent } from './types'
import Setting from './constant'

const setting: StoreonModule<SettingStore, SettingEvent> = (store) => {
	store.on('@init', () => ({
		safeMode: false,
		fullCensor: false,
		useDefaultPreference: true,
		preference: [],
		useDefaultFilter: true,
		filter: []
	}))

	store.on(Setting.SAFE_MODE, (store, safeMode) => {
		setPersist('safeMode', safeMode)

		return {
			...store,
			safeMode
		}
	})

	store.on(Setting.FULL_CENSOR, (store, fullCensor) => {
		setPersist('fullCensor', fullCensor)

		return {
			...store,
			fullCensor
		}
	})

	store.on(Setting.DEFAULT_PREFERENCE, (store, useDefaultPreference) => {
		setPersist('useDefaultPreference', useDefaultPreference)

		return {
			...store,
			useDefaultPreference
		}
	})

	store.on(Setting.ADD_PREFERENCE, (store, newPreference) => {
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

	store.on(Setting.REMOVE_PREFERENCE, (store, removePreference) => {
		let preference = store.preference.filter(
			(preference) => preference !== removePreference
		)

		setPersist('preference', preference)

		return {
			...store,
			preference
		}
	})

	store.on(Setting.SET_PREFERENCE, (store, preference) => {
		return {
			...store,
			preference
		}
	})

	store.on(Setting.UPDATE_DEFAULT_FILTER, (store, useDefaultFilter) => {
		setPersist('useDefaultFilter', useDefaultFilter)

		return {
			...store,
			useDefaultFilter
		}
	})

	store.on(Setting.ADD_FILTER, (store, newFilter) => {
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

	store.on(Setting.REMOVE_FILTER, (store, removeFilter) => {
		let filter = store.filter.filter((filter) => filter !== removeFilter)

		setPersist('filter', filter)

		return {
			...store,
			filter
		}
	})

	store.on(Setting.SET_FILTER, (store, filter) => {
		return {
			...store,
			filter
		}
	})
}

export type { SettingStore, SettingEvent }
export default setting
