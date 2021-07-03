import { useCallback } from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import tw, { combine } from '@tailwind'

import styles from './tab.module.sass'

import { BaseLayoutTabComponent } from './types'

const twClass = {
	active: tw`text-gray-900 dark:text-gray-200 border-black dark:border-gray-200`,
	default: tw`text-gray-400 dark:text-gray-500 border-transparent hover:text-gray-700 focus:text-gray-300 dark:hover:text-gray-300 dark:focus:text-gray-400 transition-colors`
} as const

export const BaseTab: BaseLayoutTabComponent = ({
	Icon,
	title,
	link,
	toggle
}) => {
	let { asPath } = useRouter()

	let isActive = link === asPath

	let handleToggle = useCallback(() => {
		if (window.innerWidth < 568) toggle()
	}, [])

	if (link === '/' && asPath.startsWith('/search/')) isActive = true

	return (
		<Link href={link}>
			<a
				key={title}
				className={combine(
					styles.tab,
					isActive ? twClass.active : twClass.default,
					tw(
						`flex flex-row items-center pl-6 py-2 mb-2 font-medium border-0 border-r-4 border-solid cursor-pointer no-underline`
					)
				)}
				onClick={handleToggle}
			>
				<Icon className={styles.icon} />
				{title}
			</a>
		</Link>
	)
}
