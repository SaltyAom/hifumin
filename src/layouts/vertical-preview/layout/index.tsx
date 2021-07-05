import tw from '@tailwind'

import type { VerticalLayoutComponent } from './types'

const VerticalLayout: VerticalLayoutComponent = ({
	title,
	children
}) => (
	<section className={tw`flex flex-col w-full mx-auto my-4 xs:my-12 px-4`}>
		<h1 className={tw`text-4xl text-gray-700 dark:text-gray-200 font-semibold my-4`}>
			{title}
		</h1>
		{children}
	</section>
)

export default VerticalLayout