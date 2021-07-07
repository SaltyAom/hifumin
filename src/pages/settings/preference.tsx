import { useRef, useCallback, useMemo } from 'react'
import type { FormEvent } from 'react'

import { useSettings } from '@stores/settings'

import { SettingLayout, SwitchSetting, SettingLabels } from '@layouts/settings'

import { Plus } from 'react-feather'
import { TextBox, Spacer, Chip } from '@atoms'

import tw from '@tailwind'

import { tags as defaultTags } from '@services/data'

const distinctTags = (tags: string[]) => {
	let system: string[] = []
	let custom: string[] = []

	tags.forEach((tag) => {
		if (defaultTags.includes(tag)) system.push(tag)
		else custom.push(tag)
	})

	return { system, custom }
}

const PreferenceSetting = () => {
	let {
		settings: { useDefaultPreference, preferenceList },
		updateSwitch,
		updateSetting
	} = useSettings()

	let preferenceRef = useRef<HTMLInputElement>(null)

	let addPreference = useCallback(
		(preference: string) => {
			if (!preferenceList.includes(preference))
				updateSetting('preferenceList')([...preferenceList, preference])
		},
		[preferenceList]
	)

	let removePreference = useCallback(
		(preference: string) => {
			let newPreference = [...preferenceList]

			let preferenceIndex = newPreference.indexOf(preference)

			if (preferenceIndex === -1) return

			newPreference.splice(preferenceIndex, 1)

			updateSetting('preferenceList')(newPreference)
		},
		[preferenceList]
	)

	let requestAddingPreference = useCallback(
		(event: FormEvent) => {
			event.preventDefault()

			let input = preferenceRef.current
			if (!input || !input.value) return

			addPreference(input.value)

			input.value = ''
		},
		[preferenceList]
	)

	let handleToggle = useCallback(
		(preference: string) => {
			if (preferenceList.includes(preference))
				removePreference(preference)
			else addPreference(preference)
		},
		[preferenceList]
	)

	let { system, custom } = useMemo(
		() => distinctTags(preferenceList),
		[preferenceList]
	)

	return (
		<SettingLayout
			title="Preference"
			labels={[
				'Add your preference for accurate recommendation and discover.'
			]}
		>
			<SwitchSetting
				value={useDefaultPreference}
				update={updateSwitch('useDefaultPreference')}
			>
				<SettingLabels title="Use default preference" />
			</SwitchSetting>
			<section className={tw(`flex flex-col transition-opacity ${useDefaultPreference ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`)}>
				<form
					className={tw`w-2/4 m-0 p-0`}
					onSubmit={requestAddingPreference}
				>
					<TextBox
						inputRef={preferenceRef}
						name="setting-preference"
						placeholder="Your preference"
						suffix={<Plus />}
					/>
				</form>
				<section className={tw`flex-row flex-nowrap w-full my-2`}>
					{custom.map((tag) => (
						<Chip
							key={tag}
							className={tw`mr-1 mb-1`}
							value={tag}
							removable
							onRemove={removePreference}
						/>
					))}
				</section>
				<Spacer small />
				<h5
					className={tw`text-xl text-gray-800 dark:text-gray-200 font-medium m-0 mb-4`}
				>
					Or you can browser from top 100 tags.
				</h5>
				<section>
					{defaultTags.map((tag) => (
						<Chip
							key={tag}
							className={tw`mr-1 mb-1`}
							active={system.includes(tag)}
							value={tag}
							onClick={handleToggle}
						/>
					))}
				</section>
			</section>
		</SettingLayout>
	)
}

export default PreferenceSetting
