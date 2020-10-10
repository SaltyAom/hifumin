import { StoreonModule } from 'storeon'

import { setPersist } from '@libs'

import { SettingStore, SettingEvent } from './types'

const Setting: StoreonModule<SettingStore, SettingEvent> = (store) => {
	store.on('@init', () => ({ safeMode: false, fullCensor: false }))

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
}

export type { SettingStore, SettingEvent }
export default Setting
