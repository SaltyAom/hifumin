import { useRef, useCallback } from 'react'
import type { FormEvent } from 'react'

import { useSettings } from '@stores/settings'

import { SettingLayout, SwitchSetting, SettingLabels } from '@layouts/settings'

import { Plus } from 'react-feather'
import { TextBox, Chip } from '@atoms'

import tw from '@tailwind'

import { settings as Settings } from '@services/settings'

const FilterSetting = () => {
	let {
		settings: { useDefaultFilter, filterList },
		updateSwitch,
		updateSetting
	} = useSettings()

	let filterRef = useRef<HTMLInputElement>(null)

	let addFilter = useCallback(
		(filter: string) => {
			if (!filterList.includes(filter))
				updateSetting('filterList')([...filterList, filter])
		},
		[filterList]
	)

	let removeFilter = useCallback(
		(filter: string) => {
			let newFilter = [...filterList]

			let filterIndex = newFilter.indexOf(filter)

			if (filterIndex === -1) return

			newFilter.splice(filterIndex, 1)

			updateSetting('filterList')(newFilter)
		},
		[filterList]
	)

	let requestAddingFilter = useCallback(
		(event: FormEvent) => {
			event.preventDefault()

			let input = filterRef.current
			if (!input || !input.value) return

			addFilter(input.value)

			input.value = ''
		},
		[filterList]
	)

	return (
		<SettingLayout
			title="Filter"
			labels={['Remove unwanted tags or keyword from your discover.']}
		>
			<SwitchSetting
				value={useDefaultFilter}
				update={updateSwitch('useDefaultFilter')}
			>
				<SettingLabels {...Settings.filter.filter} />
			</SwitchSetting>
			<section
				className={tw(
					`flex flex-col w-full transition-opacity ${
						useDefaultFilter
							? 'opacity-50 pointer-events-none cursor-not-allowed'
							: ''
					}`
				)}
			>
				<form
					className={tw`w-2/4 m-0 p-0`}
					onSubmit={requestAddingFilter}
				>
					<TextBox
						inputRef={filterRef}
						name="setting-filter"
						placeholder="Your filter"
						suffix={<Plus />}
					/>
				</form>
				<section className={tw`flex-row flex-nowrap w-full my-2`}>
					{filterList.map((tag) => (
						<Chip
							key={tag}
							className={tw`mr-1 mb-1`}
							value={tag}
							removable
							onRemove={removeFilter}
						/>
					))}
				</section>
			</section>
		</SettingLayout>
	)
}

export default FilterSetting
