import { isServer } from '@services/is'

const localStorageAvailable = !isServer && localStorage

export const getPersist = (key: string) => {
	if (!localStorageAvailable) return null

	let persisted = localStorage.getItem(key)

	return persisted ? JSON.parse(persisted) : null
}

export const initPersist = <T>(key: string, initialValue: T): T => {
	if (!localStorageAvailable) return initialValue

	let persisted = getPersist(key)

	if (persisted !== null) return persisted

	localStorage.setItem(key, JSON.stringify(initialValue))
	return initialValue
}

export const setPersist = <T>(key: string, value: T): T | null => {
	if (!localStorageAvailable) return null

	localStorage.setItem(key, JSON.stringify(value))

	return value
}
