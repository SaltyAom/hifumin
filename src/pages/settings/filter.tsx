import { useCallback } from 'react'

import { useStoreon } from 'storeon/react'
import { SettingEvent, SettingStore } from '@stores'

import SettingsLayout, {
	MenuLayout,
	MenuDetail,
	MenuContainer,
	MenuToggle
} from '@layouts/settings'

import { CustomTagForm, RemovableChip } from '@components'

import '@styles/settings/preference.styl'

const Preference = () => {
	let { useDefaultFilter, filter, dispatch } = useStoreon<
		SettingStore,
		SettingEvent
	>('useDefaultFilter', 'filter')

	let toggleDefaultPreference = useCallback((defaultFilter) => {
		dispatch('UPDATE_DEFAULT_FILTER', !defaultFilter)
	}, [])

	const addNewPreference = (preference) => {
			dispatch('ADD_FILTER', preference)
		},
		removePreference = (preference) => {
			dispatch('REMOVE_FILTER', preference)
		}

	return (
		<SettingsLayout>
			<MenuLayout title="Filter">
				<MenuToggle
					active={useDefaultFilter}
					onSwitch={toggleDefaultPreference}
				>
					Use default filter
				</MenuToggle>
				<MenuDetail>
					Remove unwanted tags or keyword from your feed
				</MenuDetail>
				<MenuContainer disabled={useDefaultFilter}>
					<CustomTagForm
						placeholder="Filter"
						onSubmit={addNewPreference}
					/>
					<MenuDetail className="mt-4">
						{filter.map((tag) => (
							<RemovableChip key={tag} onClick={removePreference}>
								{tag}
							</RemovableChip>
						))}
					</MenuDetail>
				</MenuContainer>
			</MenuLayout>
		</SettingsLayout>
	)
}

export default Preference
