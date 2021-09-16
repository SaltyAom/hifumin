import { SafeMode, ThemeMode, useSettings } from '@stores/settings'

import {
	DropDownSetting,
	SettingLabels,
	SettingLayout
} from '@layouts/settings'

import { enumToArrayDetail } from '@services/array'

import { settings as Settings } from '@services/settings'

const AppearanceSetting = () => {
	let { settings, updateDropDown } = useSettings()

	return (
		<SettingLayout
			title="Preference"
			labels={['Adjust platform appearance behavior.']}
		>
			<DropDownSetting
				selected={ThemeMode[settings.themeMode]}
				options={enumToArrayDetail(ThemeMode)}
				update={updateDropDown('themeMode', ThemeMode)}
			>
				<SettingLabels {...Settings.appearance.theme} />
			</DropDownSetting>

			<DropDownSetting
				selected={SafeMode[settings.safeMode]}
				options={enumToArrayDetail(SafeMode)}
				update={updateDropDown('safeMode', SafeMode)}
			>
				<SettingLabels {...Settings.appearance.safe} />
			</DropDownSetting>

			{/* <DropDownSettingLayout
					selected={ReaderType[settings.readerType]}
					options={enumToArrayDetail(ReaderType)}
					update={updateDropDown('readerType', ReaderType)}
				>
					<SettingLabel title="Reader Type" details={['reader type']} />
				</DropDownSettingLayout> */}
		</SettingLayout>
	)
}

export default AppearanceSetting
