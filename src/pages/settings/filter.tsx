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

import { CustomTagForm, RemovableChip } from '@components'

const Preference = () => {
	let { useDefaultFilter, filter, dispatch } = useStoreon<
		SettingStore,
		SettingEvent
	>('useDefaultFilter', 'filter')

	let toggleDefaultPreference = useCallback((defaultFilter: boolean) => {
		dispatch(Setting.UPDATE_DEFAULT_FILTER, !defaultFilter)
	}, [])

	let addNewPreference = (preference: string) => {
			dispatch(Setting.ADD_FILTER, preference)
		}

		let removePreference = (preference: string) => {
			dispatch(Setting.REMOVE_FILTER, preference)
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
						placeholder="Type custom filter"
						onSubmit={addNewPreference}
						enterKeyHint="done"
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
