import { useCallback } from 'react'

import { useNetworkStatus } from 'react-adaptive-hooks'

import { useAtom } from 'jotai'
import { CompressionType, SettingsAtom, settingsAtom } from '@stores/settings'

import {
	DropDownSetting,
	SettingLabel,
	SettingLabels,
	SettingLayout
} from '@layouts/settings'

import { Enum, enumToArrayDetail } from '@services/array'

const Settings = () => {
	let [settings, updateSettings] = useAtom(settingsAtom)

	const { unsupported: notSupportNetworkDetection } = useNetworkStatus()

	let updateDropDown = useCallback(
		<T extends Enum>(key: keyof SettingsAtom, enums: T) =>
			(selected: keyof T) => {
				updateSettings({
					[key]: enums[selected]
				})
			},
		[updateSettings]
	)

	return (
		<SettingLayout
			title="Networking"
			labels={[
				'Customize your network usage.'
			]}
		>
			<DropDownSetting
				selected={CompressionType[settings.compressionType]}
				options={enumToArrayDetail(CompressionType)}
				update={updateDropDown('compressionType', CompressionType)}
				footer={[
					'"Native", using an original image.',
					'"Compact", using a compressed image, some delay but lesser network usage.',
					'"Heavy", using a heavy compressed image, more delay but least network usage.',
					notSupportNetworkDetection
						? ''
						: '"Adaptive", selecting the best compression base on your network speed.'
				].map((label) => (
					<SettingLabel small key={label}>
						{label}
					</SettingLabel>
				))}
			>
				<SettingLabels
					title="Image compression"
					details={['Select how the image should be displayed.']}
				/>
			</DropDownSetting>
		</SettingLayout>
	)
}

export default Settings
