import tw, { combine } from '@tailwind'

import styles from './search-header.module.sass'

import type { SearchHeaderComponent } from './types'

const SearchHeader: SearchHeaderComponent = ({
	children,
	expanded = false
}) => {
	let padding = tw`lg:mx-0 px-4 pb-4`

	if (expanded)
		return (
			<header
				className={combine(
					tw`flex flex-col justify-end items-center w-full mx-auto`,
					padding,
					tw`!px-8`
				)}
				style={{
					height: 360
				}}
			>
				<div
					className={tw`w-full`}
					style={{
						maxWidth: 460
					}}
				>
					<h1 className={combine(tw`text-[2.75em] sm:text-6xl font-normal text-center mt-0 mb-2 md:mb-6 pb-4`, styles.title)}>Opener Studio</h1>
					{children}
				</div>
			</header>
		)

	return (
		<header
			className={combine(
				tw`sticky top-[64px] lg:top-0 z-30 bg-white dark:bg-gray-800`,
				padding
			)}
		>
			{children}
		</header>
	)
}

export default SearchHeader
