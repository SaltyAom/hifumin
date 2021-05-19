import tw from '@tailwind'

import { useAtom } from 'jotai'
import {
	PageType,
	ReaderType,
	SafeMode,
	SettingsAtom,
	settingsAtom,
	ThemeMode
} from '@stores/settings'

import {
	DropDownSettingLayout,
	SwitchSettingLayout,
	SettingLabel
} from '@layouts/settings'

import { Spacer } from '@components/atoms'

import { Enum, enumToArrayDetail } from '@services/array'
import { useCallback } from 'react'

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

	let updateSwitch = useCallback(
		(key: keyof SettingsAtom) => (updated: boolean) => {
			updateSettings({
				[key]: updated
			})
		},
		[updateSettings]
	)

	return (
		<main className={tw`flex flex-col w-full max-w-[520px] mx-auto py-12`}>
			<h1 className={tw`text-4xl text-gray-900 font-semibold my-1`}>
				Settings
			</h1>
			<SettingLabel
				details={[
					'You can customize how platform should behave to fit your preference here.'
				]}
			/>
			<Spacer />

			<DropDownSettingLayout
				selected={ThemeMode[settings.themeMode]}
				options={enumToArrayDetail(ThemeMode)}
				update={updateDropDown('themeMode', ThemeMode)}
			>
				<SettingLabel
					title="Theme Mode"
					details={['Set color theme of the platform']}
				/>
			</DropDownSettingLayout>

			<DropDownSettingLayout
				selected={SafeMode[settings.safeMode]}
				options={enumToArrayDetail(SafeMode)}
				update={updateDropDown('safeMode', SafeMode)}
			>
				<SettingLabel title="Safe Mode" details={['Safe mode']} />
			</DropDownSettingLayout>

			<DropDownSettingLayout
				selected={PageType[settings.pageType]}
				options={enumToArrayDetail(PageType)}
				update={updateDropDown('pageType', PageType)}
			>
				<SettingLabel title="Page Type" details={['Page Type']} />
			</DropDownSettingLayout>

			<DropDownSettingLayout
				selected={ReaderType[settings.readerType]}
				options={enumToArrayDetail(ReaderType)}
				update={updateDropDown('readerType', ReaderType)}
			>
				<SettingLabel title="Reader Type" details={['reader type']} />
			</DropDownSettingLayout>

			<SwitchSettingLayout
				value={settings.collectHistory}
				update={updateSwitch('collectHistory')}
			>
				<SettingLabel
					title="Collect History"
					details={['collect history']}
				/>
			</SwitchSettingLayout>
		</main>
	)
}

export default Settings
