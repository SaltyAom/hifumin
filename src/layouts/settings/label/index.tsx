import tw from '@tailwind'

import type { LabelComponent, SettingLabelComponent } from './types'

export const Label: LabelComponent = ({ children, small = false }) => (
	<p
		className={tw(
			`${small ? 'text-md text-gray-400 dark:text-gray-300 leading-normal' : 'text-lg text-gray-500 dark:text-gray-400'} my-1`
		)}
	>
		{children}
	</p>
)

export const SettingLabel: SettingLabelComponent = ({
	title = '',
	details = []
}) => (
	<>
		{title ? (
			<h2 className={tw`text-2xl text-gray-800 dark:text-gray-200 medium my-1`}>{title}</h2>
		) : null}
		{details.map((detail, index) => (
			<Label key={index.toString()}>{detail}</Label>
		))}
	</>
)
