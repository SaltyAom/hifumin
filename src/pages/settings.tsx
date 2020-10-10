import { Fragment, useCallback } from 'react'

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
	const { safeMode, dispatch } = useStoreon<SettingStore, SettingEvent>(
		'safeMode'
	)

	const toggleSafeMode = useCallback((active) => {
		dispatch('UPDATE_SAFE_MODE', !active)
	}, [])

	return (
		<SettingsLayout>
			<MenuLayout title="Preference" icon={<Account />}>
				{/* <MenuLink href="recommendation">Recommendation</MenuLink> */}
				<MenuToggle active={safeMode} onSwitch={toggleSafeMode}>
					Safe mode
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
