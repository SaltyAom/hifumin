import { useCallback } from 'react'

import { useAtom } from 'jotai'
import { SettingsAtom, settingsAtom } from '@stores/settings'

import {
	SwitchSetting,
	SettingLabel,
	SettingLabels,
	SettingLayout
} from '@layouts/settings'

const DataUsageSetting = () => {
	let [settings, updateSettings] = useAtom(settingsAtom)

	let updateSwitch = useCallback(
		(key: keyof SettingsAtom) => (updated: boolean) => {
			updateSettings({
				[key]: updated
			})
		},
		[updateSettings]
	)

	return (
		<SettingLayout
			title="Data Usage"
			labels={[
				'Opener only use Google Analytic and Microsoft Clarity for analytic to improve the platform.',
				'Other data such as browsing history and bookmark is only store your data in your browser.',
				'Not even single data is stored on Opener server.'
			]}
		>
			<SwitchSetting
				value={settings.collectHistory}
				update={updateSwitch('collectHistory')}
				footer={[
					'Opener do not store or save your browsing history online, your browsing history is saved inside your browser.',
					'We cannot view or access your browsing history.',
					'We respect your privacy.'
				].map((label) => (
					<SettingLabel key={label}>{label}</SettingLabel>
				))}
			>
				<SettingLabels
					title="Save History"
					details={['Save browsing history']}
				/>
			</SwitchSetting>
		</SettingLayout>
	)
}

export default DataUsageSetting
