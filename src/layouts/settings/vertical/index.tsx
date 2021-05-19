import tw from '@tailwind'

import { VerticalSettingLayoutComponent } from './types'

export const VerticalSettingLayout: VerticalSettingLayoutComponent = ({
	children,
	action
}) => (
	<section className={tw`flex flex-col items-center sm:flex-row w-full my-3`}>
		<div className={tw`flex flex-col flex-1`}>{children}</div>
		{action}
	</section>
)
