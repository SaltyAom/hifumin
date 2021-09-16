import tw from '@tailwind'

import type { SettingLabelComponent, SettingLabelsComponent } from './types'

export const SettingLabel: SettingLabelComponent = ({
	children,
	small = false
}) => (
	<p
		className={tw(
			`${
				small
					? 'text-md text-gray-400 dark:text-gray-300 leading-normal'
					: 'text-lg text-gray-500 dark:text-gray-400'
			} my-1`
		)}
	>
		{children}
	</p>
)

const SettingLabels: SettingLabelsComponent = ({
	id,
	title = '',
	labels = []
}) => (
	<>
		{title ? (
			<h2
				id={id}
				className={tw`text-2xl text-gray-800 dark:text-gray-200 medium my-1`}
			>
				{title}
			</h2>
		) : null}
		{labels.map((label) => (
			<SettingLabel key={label}>{label}</SettingLabel>
		))}
	</>
)

export default SettingLabels
