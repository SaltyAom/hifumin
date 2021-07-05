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
	DropDownSetting,
	SwitchSetting,
	SettingLabel,
	SettingLabels
} from '@layouts/settings'

import { Spacer, OpenGraph } from '@atoms'

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
		<>
			<OpenGraph title="Settings - Opener Studio" />
			<main
				className={tw`flex flex-col w-full max-w-[580px] mx-auto px-6 py-4 md:py-12`}
			>
				<h1
					className={tw`text-4xl text-gray-900 dark:text-gray-200 font-semibold my-2`}
				>
					Settings
				</h1>
				<SettingLabels
					details={[
						'Customize how platform should behave to fit your preference.'
					]}
				/>
				<Spacer />

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
						details={[
							'Hide the image when the sudden attack come in.'
						]}
					/>
				</DropDownSetting>

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

				{/* <DropDownSettingLayout
					selected={ReaderType[settings.readerType]}
					options={enumToArrayDetail(ReaderType)}
					update={updateDropDown('readerType', ReaderType)}
				>
					<SettingLabel title="Reader Type" details={['reader type']} />
				</DropDownSettingLayout> */}

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
			</main>
		</>
	)
}

export default Settings
