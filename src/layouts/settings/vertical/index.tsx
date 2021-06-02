import tw, { combine } from '@tailwind'

import { Spacer } from '@components/atoms'

import { VerticalSettingLayoutComponent } from './types'

export const VerticalSettingLayout: VerticalSettingLayoutComponent = ({
	children,
	action,
	footer,
	className = ''
}) => (
	<section className={tw`flex flex-col items-start`}>
		<section
			className={combine(
				tw`flex flex-col items-start sm:items-center sm:flex-row w-full my-3`,
				className
			)}
		>
			<div className={tw`flex flex-col flex-1`}>{children}</div>
			{action}
		</section>
		{footer ?? <></>}
		{typeof footer !== 'undefined' ? <Spacer small /> : null}
	</section>
)
