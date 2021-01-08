import { useCallback } from 'react'

import { useStoreon } from 'storeon/react'
import { SettingEvent, SettingStore } from '@models'
import { Setting } from '@models/constant'

import SettingsLayout, {
	MenuLayout,
	MenuDetail,
	MenuContainer,
	MenuToggle
} from '@layouts/settings'

import { Chip, CustomTagForm, RemovableChip } from '@components'

import { tags } from '@services'

const Preference = () => {
	let { useDefaultPreference, preference, dispatch } = useStoreon<
		SettingStore,
		SettingEvent
	>('useDefaultPreference', 'preference')

	let toggleDefaultPreference = useCallback((defaultPreference) => {
		dispatch(Setting.DEFAULT_PREFERENCE, !defaultPreference)
	}, [])

	const addNewPreference = (preference: string) => {
			dispatch(Setting.ADD_PREFERENCE, preference)
		},
		removePreference = (preference: string) => {
			dispatch(Setting.REMOVE_PREFERENCE, preference)
		}

	return (
		<SettingsLayout>
			<MenuLayout title="Preference">
				<MenuToggle
					active={useDefaultPreference}
					onSwitch={toggleDefaultPreference}
				>
					Use default preference
				</MenuToggle>
				<MenuDetail>
					Adjust your preference for recommendation system.
				</MenuDetail>
				<MenuContainer disabled={useDefaultPreference}>
					<CustomTagForm
						placeholder="Type custom preference"
						onSubmit={addNewPreference}
						enterKeyHint="done"
					/>
					<MenuDetail className={'mt-4'}>
						{preference
							.filter((tag) => !tags.includes(tag))
							.map((tag) => (
								<RemovableChip
									key={tag}
									onClick={removePreference}
								>
									{tag}
								</RemovableChip>
							))}
					</MenuDetail>
				</MenuContainer>
				<MenuDetail>Or you can browser from top 100 tags.</MenuDetail>
				<MenuContainer disabled={useDefaultPreference}>
					{tags.map((tag) => (
						<Chip
							onClick={(active) => {
								dispatch(
									!active
										? Setting.ADD_PREFERENCE
										: Setting.REMOVE_PREFERENCE,
									tag
								)
							}}
							active={preference.includes(tag)}
							key={tag}
						>
							{tag}
						</Chip>
					))}
				</MenuContainer>
			</MenuLayout>
		</SettingsLayout>
	)
}

export default Preference
