import { FunctionComponent, useEffect, useReducer } from 'react'

import tw, { combine } from '@services/tailwind'

import { Bookmark, Clock, Grid, Menu, Sliders } from 'react-feather'

import styles from './base.module.sass'

import { BaseTab } from './components'
import type { BaseLayoutTabs } from './components'

const sidebars: BaseLayoutTabs = [
	[Grid, 'Discover', '/'],
	[Bookmark, 'Bookmark', '/bookmark'],
	[Clock, 'History', '/history'],
	[Sliders, 'Settings', '/settings']
] as const

export const BaseLayout: FunctionComponent = ({ children }) => {
	let [fullSide, toggleFullSide] = useReducer((v) => !v, true)
	let [initial, loaded] = useReducer(() => false, true)

	useEffect(() => {
		let persistedSidebar = localStorage.getItem('sidebar')

		if (persistedSidebar && JSON.parse(persistedSidebar) === false)
			toggleFullSide()

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				loaded()
			})
		})
	}, [])

	return (
		<>
			<aside
				className={combine(
					initial ? '' : styles['width-transition'],
					tw(
						`sticky top-0 flex flex-col justify-start py-4 ${
							fullSide ? 'w-[240px]' : 'w-[72px]'
						} text-xl h-screen border-0 border-solid border-r border-gray-200 overflow-hidden`
					)
				)}
			>
				<h1
					className={tw`flex flex-row items-center px-3 py-2 m-0 mb-4 font-medium`}
				>
					<button
						className={tw`flex justify-center items-center appearance-none mr-2 p-3 mr-text-gray-900 focus:text-gray-900 border-0 bg-transparent hover:bg-gray-100 rounded-full transition-colors cursor-pointer`}
						onClick={toggleFullSide}
					>
						<Menu width={26} height={26} />
					</button>
					Opener
				</h1>
				{sidebars.map(([Icon, title, link]) => (
					<BaseTab Icon={Icon} title={title} link={link} />
				))}
			</aside>
			<section className={tw`flex flex-col flex-1 px-6`}>
				{children}
			</section>
		</>
	)
}
