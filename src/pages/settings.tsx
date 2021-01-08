import { useCallback } from 'react'

import { SettingEvent, SettingStore } from '@models'
import { useStoreon } from 'storeon/react'
import { Setting } from '@models/constant'

import SettingsLayout, {
	MenuLayout,
	MenuLink,
	MenuToggle,
	MenuDetail,
	MenuButton
} from '@layouts/settings'

import { Account, Info } from '@icons'

const Settings = () => {
	const { safeMode, fullCensor, dispatch } = useStoreon<
		SettingStore,
		SettingEvent
	>('safeMode', 'fullCensor')

	const toggleSafeMode = useCallback((active) => {
			dispatch(Setting.SAFE_MODE, !active)
		}, []),
		toggleFullCensor = useCallback((active) => {
			dispatch(Setting.FULL_CENSOR, !active)
		}, [])

	return (
		<SettingsLayout>
			<MenuLayout title="Preference" icon={<Account />}>
				<MenuLink href="/settings/preference">Preference</MenuLink>
				<MenuLink href="/settings/filter">Filter</MenuLink>
				<MenuToggle active={safeMode} onSwitch={toggleSafeMode}>
					Safe mode
				</MenuToggle>
				<MenuToggle active={fullCensor} onSwitch={toggleFullCensor}>
					Full censorship
				</MenuToggle>
				{/* {isInstallSupport && !isPwa ? (
					<MenuButton onClick={() => prompt()} detail="Install">
						Install
					</MenuButton>
				) : null} */}
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
