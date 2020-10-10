import { useCallback } from 'react'

import { SettingEvent, SettingStore } from '@stores'
import { useStoreon } from 'storeon/react'

import SettingsLayout, {
	MenuLayout,
	MenuLink,
	MenuToggle,
	MenuDetail
} from '@layouts/settings'

import { Account, Info } from '@icons'

const Settings = () => {
	const { safeMode, fullCensor, dispatch } = useStoreon<
		SettingStore,
		SettingEvent
	>('safeMode', 'fullCensor')

	const toggleSafeMode = useCallback((active) => {
			dispatch('UPDATE_SAFE_MODE', !active)
		}, []),
		toggleFullCensor = useCallback((active) => {
			dispatch('UPDATE_FULL_CENSOR', !active)
		}, [])

	return (
		<SettingsLayout>
			<MenuLayout title="Preference" icon={<Account />}>
				<MenuLink href="/settings/preference">Preference</MenuLink>
				<MenuToggle active={safeMode} onSwitch={toggleSafeMode}>
					Safe mode
				</MenuToggle>
				<MenuToggle active={fullCensor} onSwitch={toggleFullCensor}>
					Full censorship
				</MenuToggle>
			</MenuLayout>

			<MenuLayout title="About" icon={<Info />}>
				<MenuLink href="/about">About Opener</MenuLink>
				<MenuLink href="/support">Support</MenuLink>
				<MenuDetail>&copy; SaltyAom 2020.</MenuDetail>
			</MenuLayout>
		</SettingsLayout>
	)
}

export default Settings
