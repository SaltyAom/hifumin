import { useNetworkStatus } from 'react-adaptive-hooks'

import { CompressionType, useSettings } from '@stores/settings'

import {
	DropDownSetting,
	SettingLabel,
	SettingLabels,
	SettingLayout
} from '@layouts/settings'

import { enumToArrayDetail } from '@services/array'

import { settings as Settings } from '@services/settings'

const PerformanceSetting = () => {
	let { settings, updateDropDown } = useSettings()

	const { unsupported: notSupportNetworkDetection } = useNetworkStatus()

	return (
		<SettingLayout
			title="Networking"
			labels={['Customize your network usage.']}
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
				<SettingLabels {...Settings.performance.compression} />
			</DropDownSetting>
		</SettingLayout>
	)
}

export default PerformanceSetting
