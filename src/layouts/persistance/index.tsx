import { useEffect } from 'react'
import type { FunctionComponent } from 'react'

import { useAtom } from 'jotai'
import { historyAtomSetter, settingsAtom } from '@stores/settings'
import { getHistory } from '@stores/settings/history'

export const PersistanceProvider: FunctionComponent = ({ children }) => {
	let [, updateSettings] = useAtom(settingsAtom)
	let [, setHistory] = useAtom(historyAtomSetter)

	useEffect(() => {
		let persistedSettings = localStorage.getItem('settings')

		if (persistedSettings) updateSettings(JSON.parse(persistedSettings))

		setHistory(getHistory())
	}, [])

	return <>{children}</>
}
