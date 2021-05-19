import { useEffect } from 'react'
import type { FunctionComponent } from 'react'

import { useAtom } from 'jotai'
import { settingsAtom } from '@stores/settings'

export const PersistanceProvider: FunctionComponent = ({ children }) => {
	let [, updateSettings] = useAtom(settingsAtom)

	useEffect(() => {
		let persistedSettings = localStorage.getItem('settings')

		if (persistedSettings) updateSettings(JSON.parse(persistedSettings))
	}, [])

	return <>{children}</>
}
