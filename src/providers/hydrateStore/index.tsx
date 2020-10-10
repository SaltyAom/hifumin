import { useEffect } from 'react'

import { useStoreon } from 'storeon/react'

import { SettingEvent, SettingStore } from '@stores'

import { initPersist } from '@libs'

const HydrateStoreProvider = ({ children }) => {
	const { dispatch } = useStoreon<SettingStore, SettingEvent>()

	useEffect(() => {
		dispatch('UPDATE_SAFE_MODE', initPersist('safeMode', false))
		dispatch('UPDATE_FULL_CENSOR', initPersist('fullCensor', false))
		dispatch(
			'UPDATE_DEFAULT_PREFERENCE',
			initPersist('useDefaultPreference', true)
		)
		dispatch('SET_PREFERENCE', initPersist<string[]>('preference', []))
	}, [])

	return children
}

export default HydrateStoreProvider
