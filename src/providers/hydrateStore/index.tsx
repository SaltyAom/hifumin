import { useEffect } from 'react'

import { useStoreon } from 'storeon/react'

import { SettingEvent, SettingStore } from '@stores'
import { Setting } from '@stores/constant'

import { initPersist } from '@libs'

const HydrateStoreProvider = ({ children }) => {
	const { dispatch } = useStoreon<SettingStore, SettingEvent>()

	useEffect(() => {
		dispatch(Setting.SAFE_MODE, initPersist('safeMode', false))
		dispatch(Setting.FULL_CENSOR, initPersist('fullCensor', false))
		dispatch(
			Setting.DEFAULT_PREFERENCE,
			initPersist('useDefaultPreference', true)
		)
		dispatch(
			Setting.SET_PREFERENCE,
			initPersist<string[]>('preference', [])
		)
		dispatch(
			Setting.UPDATE_DEFAULT_FILTER,
			initPersist('useDefaultFilter', true)
		)
		dispatch(Setting.SET_FILTER, initPersist<string[]>('filter', []))
	}, [])

	return children
}

export default HydrateStoreProvider
