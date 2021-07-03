import tw from '@tailwind'

import type { VerticalGroupComponent } from './types'

export const VerticalGroup: VerticalGroupComponent = ({ title, children }) => (
	<section className={tw`flex flex-col`}>
		<section className={tw`flex flex-row items-center w-full my-4`}>
			<h1 className={tw`text-xl text-gray-700 dark:text-gray-300 font-semibold my-0 pr-4`}>
				{title}
			</h1>
			<div className={tw`flex flex-1 h-[1px] bg-gray-300 dark:bg-gray-600`} />
		</section>
		{children}
	</section>
)
