import { useCallback } from 'react'

import { useAtom } from 'jotai'
import {
	SafeMode,
	SettingsAtom,
	settingsAtom,
	ThemeMode
} from '@stores/settings'

import {
	DropDownSetting,
	SettingLabels,
	SettingLayout
} from '@layouts/settings'

import { Enum, enumToArrayDetail } from '@services/array'

const Settings = () => {
	let [settings, updateSettings] = useAtom(settingsAtom)

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
			title="Preference"
			labels={[
				'Adjust platform appearance behavior.'
			]}
		>
			<DropDownSetting
				selected={ThemeMode[settings.themeMode]}
				options={enumToArrayDetail(ThemeMode)}
				update={updateDropDown('themeMode', ThemeMode)}
			>
				<SettingLabels
					title="Theme Mode"
					details={[
						'Set color theme.',
						'Choosing "adaptive" will use the system setting.'
					]}
				/>
			</DropDownSetting>

			<DropDownSetting
				selected={SafeMode[settings.safeMode]}
				options={enumToArrayDetail(SafeMode)}
				update={updateDropDown('safeMode', SafeMode)}
			>
				<SettingLabels
					title="Safe Mode"
					details={['Hide the image when the sudden attack come in.']}
				/>
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

export default Settings
