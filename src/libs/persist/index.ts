import { isServer } from '@libs/is'

const localStorageAvailable = !isServer && localStorage

export const getPersist = (key: string) => {
		if (!localStorageAvailable) return null

		return JSON.parse(localStorage.getItem(key))
	},
	initPersist = <T>(key: string, initialValue: T): T => {
		if (!localStorageAvailable) return initialValue

		let persisted = getPersist(key)

		if (persisted) return persisted

		localStorage.setItem(key, JSON.stringify(initialValue))
		return initialValue
	},
	setPersist = <T>(key: string, value: T): T => {
		if (!localStorageAvailable) return null

		localStorage.setItem(key, JSON.stringify(value))

		return value
	}
