import Link from 'next/link'
import { useRouter } from 'next/router'

import tw, { combine } from '@tailwind'

import type { SettingTabComponent } from './types'

const SettingTab: SettingTabComponent = ({
	children,
	href,
	icon,
	color = tw`bg-[#007aff]`
}) => {
	let { asPath } = useRouter()

	let url = `/settings/${href}`
	let isActive = asPath === url

	return (
		<Link href={url}>
			<a
				className={combine(
					tw`flex flex-row justify-start items-center text-gray-800 dark:text-white text-xl capitalize font-medium w-full px-2 py-2 no-underline rounded-lg transition-colors`,
					isActive ? tw`bg-gray-200 dark:bg-gray-800` : tw`hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800`
				)}
			>
				<div
					className={combine(
						tw`flex justify-center items-center text-white w-[36px] h-[36px] mr-3 rounded-lg`,
						color
					)}
				>
					{icon}
				</div>
				{children}
			</a>
		</Link>
	)
}

export default SettingTab
