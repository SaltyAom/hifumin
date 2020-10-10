import { useCallback } from 'react'

import { useStoreon } from 'storeon/react'
import { SettingEvent, SettingStore } from '@stores'

import SettingsLayout, {
	MenuLayout,
	MenuDetail,
	MenuContainer,
	MenuToggle
} from '@layouts/settings'

import { Chip } from '@components'

import { tags } from '@libs'

const Preference = () => {
	let { useDefaultPreference, preference, dispatch } = useStoreon<
		SettingStore,
		SettingEvent
	>('useDefaultPreference', 'preference')

	let toggleDefaultPreference = useCallback((defaultPreference) => {
		dispatch('UPDATE_DEFAULT_PREFERENCE', !defaultPreference)
	}, [])

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
					{tags.map((tag) => (
						<Chip
							onClick={(active) => {
								dispatch(
									!active
										? 'ADD_PREFERENCE'
										: 'REMOVE_PREFERENCE',
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
