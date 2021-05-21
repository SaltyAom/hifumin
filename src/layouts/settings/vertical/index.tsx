import tw from '@tailwind'

import { Spacer } from '@components/atoms'

import { VerticalSettingLayoutComponent } from './types'

export const VerticalSettingLayout: VerticalSettingLayoutComponent = ({
	children,
	action,
	footer
}) => (
	<section className={tw`flex flex-col items-start`}>
		<section
			className={tw`flex flex-col items-center sm:flex-row w-full my-3`}
		>
			<div className={tw`flex flex-col flex-1`}>{children}</div>
			{action}
		</section>
		{footer ?? <></>}
		{typeof footer !== 'undefined' ? <Spacer small /> : null}
	</section>
)
