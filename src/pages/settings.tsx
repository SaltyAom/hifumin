import { useCallback } from 'react'

import { useNetworkStatus } from 'react-adaptive-hooks'

import { useAtom } from 'jotai'
import {
	CompressionType,
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
import { Label } from '@layouts/settings/label'

import { Spacer } from '@components/atoms'

import tw from '@tailwind'

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

	let updateSwitch = useCallback(
		(key: keyof SettingsAtom) => (updated: boolean) => {
			updateSettings({
				[key]: updated
			})
		},
		[updateSettings]
	)

	return (
		<main className={tw`flex flex-col w-full max-w-[580px] mx-auto py-12`}>
			<h1 className={tw`text-4xl text-gray-900 font-semibold my-2`}>
				Settings
			</h1>
			<SettingLabel
				details={[
					'Customize how platform should behave to fit your preference.'
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
					details={[
						'Set color theme.',
						'Choosing "adaptive" will use the system setting.'
					]}
				/>
			</DropDownSettingLayout>

			<DropDownSettingLayout
				selected={SafeMode[settings.safeMode]}
				options={enumToArrayDetail(SafeMode)}
				update={updateDropDown('safeMode', SafeMode)}
			>
				<SettingLabel
					title="Safe Mode"
					details={['Hide the image when the sudden attack come in.']}
				/>
			</DropDownSettingLayout>

			<DropDownSettingLayout
				selected={CompressionType[settings.compressionType]}
				options={enumToArrayDetail(CompressionType)}
				update={updateDropDown('compressionType', CompressionType)}
				footer={[
					'"Native", using an original image.',
					'"Compact", using a compressed image, some delay but lesser network usage.',
					'"Heavy", using a heavy compressed image, more delay but least network usage.',
					!notSupportNetworkDetection
						? '"Adaptive", selecting the best compression base on your network speed.'
						: ''
				].map((label, index) => (
					<Label small key={index}>
						{label}
					</Label>
				))}
			>
				<SettingLabel
					title="Image compression"
					details={['Select how the image should be displayed.']}
				/>
			</DropDownSettingLayout>

			{/* <DropDownSettingLayout
				selected={ReaderType[settings.readerType]}
				options={enumToArrayDetail(ReaderType)}
				update={updateDropDown('readerType', ReaderType)}
			>
				<SettingLabel title="Reader Type" details={['reader type']} />
			</DropDownSettingLayout> */}

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
