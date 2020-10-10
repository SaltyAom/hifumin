import { useEffect } from 'react'

import { useStoreon } from 'storeon/react'

import { SettingEvent, SettingStore } from '@stores'

import { initPersist } from '@libs'

const HydrateStoreProvider = ({ children }) => {
	const { dispatch } = useStoreon<SettingStore, SettingEvent>()

	useEffect(() => {
		dispatch('UPDATE_SAFE_MODE', initPersist('safeMode', false))
		dispatch('UPDATE_FULL_CENSOR', initPersist('fullCensor', false))
	}, [])

	return children
}

export default HydrateStoreProvider
