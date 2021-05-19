import tw from '@tailwind'

import type { SettingLabelComponent } from './types'

export const SettingLabel: SettingLabelComponent = ({
	title = '',
	details = []
}) => (
	<>
		{title ? (
			<h2 className={tw`text-2xl text-gray-800 medium my-1`}>{title}</h2>
		) : null}
		{details.map((detail, index) => (
			<p key={index} className={tw`text-lg text-gray-500 my-1`}>
				{detail}
			</p>
		))}
	</>
)
