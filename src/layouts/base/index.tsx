import { FunctionComponent, useEffect, useReducer } from 'react'

import tw, { combine } from '@services/tailwind'

import { Bookmark, Clock, Grid, Menu, Sliders } from 'react-feather'

import { isServer } from '@services'

import { BaseTab } from './components'

import type { BaseLayoutTabs } from './components'

import styles from './base.module.sass'

const sidebars: BaseLayoutTabs = [
	[Grid, 'Discover', '/'],
	[Bookmark, 'Bookmark', '/bookmark'],
	[Clock, 'History', '/history'],
	[Sliders, 'Settings', '/settings']
] as const

export const BaseLayout: FunctionComponent = ({ children }) => {
	let [fullSide, toggleFullSide] = useReducer(
		(v) => !v,
		isServer
			? false
			: JSON.parse(localStorage.getItem('sidebar') ?? 'false')
	)
	let [initial, loaded] = useReducer(() => false, true)
	let [key, forceUpdate] = useReducer(v => v + 1, 0)

	useEffect(() => {
		forceUpdate()

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				loaded()
			})
		})
	}, [])

	useEffect(() => {
		localStorage.setItem('sidebar', JSON.stringify(fullSide))
	}, [fullSide])

	return (
		<section className={tw`flex flex-col lg:flex-row w-full`}>
			<aside
				key={key}
				className={combine(
					styles.aside,
					initial ? '' : styles['width-transition'],
					tw(
						`z-50 fixed lg:sticky top-0 flex flex-col justify-start py-4 ${
							fullSide ? 'w-[240px]' : 'w-0 lg:w-[72px]'
						} text-xl h-screen border-0 border-solid md:border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden`
					)
				)}
			>
				<h1
					className={tw`flex flex-row items-center text-gray-900 dark:text-gray-200 font-medium px-3 py-2 m-0 mb-4`}
				>
					<button
						className={tw`flex justify-center items-center appearance-none mr-3 p-3 text-gray-900 dark:text-gray-200 focus:text-gray-900 border-0 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer`}
						onClick={toggleFullSide}
						type="button"
					>
						<Menu width={26} height={26} />
					</button>
					Opener
				</h1>
				{sidebars.map(([Icon, title, link]) => (
					<BaseTab
						Icon={Icon}
						title={title}
						link={link}
						toggle={toggleFullSide}
					/>
				))}
			</aside>

			<nav
				className={tw`sticky top-0 z-30 flex lg:hidden flex-row items-center w-full h-[64px] bg-white dark:bg-gray-900 border-0 border-b border-solid border-gray-200 dark:border-gray-700`}
			>
				<button
					className={tw`appearance-none flex justify-center items-center text-gray-900 dark:text-gray-200 focus:text-gray-900 w-[64px] h-[64px] bg-transparent border-0`}
					onClick={toggleFullSide}
					type="button"
				>
					<Menu width={26} height={26} />
				</button>
				<h1 className={tw`text-gray-900 dark:text-gray-300 text-2xl font-medium m-0`}>
					Opener
				</h1>
			</nav>
			<div
				className={tw(
					`fixed z-40 top-0 left-0 block lg:hidden w-full h-screen bg-black ${
						fullSide ? 'opacity-50' : 'hidden opacity-0'
					} transition-opacity`
				)}
				onClick={toggleFullSide}
				role="button"
				tabIndex={0}
				aria-label="Hide sidebar"
			/>

			<section className={tw`flex flex-col flex-1 px-0 lg:px-6`}>
				{children}
			</section>
		</section>
	)
}
