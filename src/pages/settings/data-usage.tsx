import { useSettings } from '@stores/settings'

import {
	SwitchSetting,
	SettingLabel,
	SettingLabels,
	SettingLayout
} from '@layouts/settings'

import { settings as Settings } from '@services/settings'

const DataUsageSetting = () => {
	let { settings, updateSwitch } = useSettings()

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
				<SettingLabels {...Settings['data-usage'].history} />
			</SwitchSetting>
		</SettingLayout>
	)
}

export default DataUsageSetting
