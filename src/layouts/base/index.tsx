/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useCallback, useEffect, useReducer } from 'react'
import type { FunctionComponent } from 'react'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useAtom } from 'jotai'
import { themeAtom, searchAtom, ThemeMode } from '@stores'

import {
	Bookmark,
	Clock,
	Grid,
	Menu,
	Settings,
	Image as ImageIcon
} from 'react-feather'

import tw, { combine } from '@tailwind'
import { isNhentai, isServer } from '@services/validation'

import { BaseTab } from './components'
import type { BaseLayoutTabs } from './components'

import styles from './base.module.sass'

const NextNprogress = dynamic(() => import('nextjs-progressbar'))

const sidebars: BaseLayoutTabs = [
	[Grid, 'Discover', '/'],
	[ImageIcon, 'Source', '/source'],
	[Bookmark, 'Bookmark', '/bookmark'],
	[Clock, 'History', '/history'],
	[Settings, 'Settings', '/settings']
] as const

const BaseLayout: FunctionComponent = ({ children }) => {
	let [theme] = useAtom(themeAtom)
	let [search, updateSearch] = useAtom(searchAtom)

	let [fullSide, toggleFullSide] = useReducer(
		(v) => !v,
		isServer
			? false
			: JSON.parse(localStorage.getItem('sidebar') ?? 'false')
	)
	let [initial, loaded] = useReducer(() => false, true)
	let [key, forceUpdate] = useReducer((v) => v + 1, 0)

	let { asPath } = useRouter()

	let emptySearch = useCallback(() => {
		updateSearch('')
	}, [updateSearch])

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
		<>
			<Head>
				<meta
					name="theme-color"
					content={theme === ThemeMode.light ? '#fff' : '#101827'}
				/>
			</Head>
			<NextNprogress
				color={theme === ThemeMode.light ? '#000' : '#fff'}
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				showOnShallow
			/>
			<section className={tw`flex flex-col lg:flex-row w-full`}>
				<aside
					key={key}
					className={combine(
						styles.aside,
						initial ? '' : styles['width-transition'],
						tw(
							`z-50 fixed lg:sticky top-0 flex flex-col justify-start py-4 ${
								fullSide ? 'w-[240px]' : 'w-0 lg:w-[72px]'
							} text-xl h-screen border-0 border-solid md:border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sm:dark:bg-gray-900 overflow-hidden`
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
						<Link href="/">
							<a
								className={tw`text-gray-900 dark:text-gray-200 no-underline`}
								onClick={emptySearch}
							>
								Opener
							</a>
						</Link>
					</h1>
					{sidebars.map(([Icon, title, link]) => (
						<BaseTab
							key={title}
							Icon={Icon}
							title={title}
							link={
								// eslint-disable-next-line no-nested-ternary
								link === '/' &&
								search !== '' &&
								!asPath.startsWith('/search')
									? isNhentai(search)
										? `/h/${search}`
										: `/search/${search}`
									: link
							}
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
					<Link href="/">
						<a
							role="heading"
							aria-level={1}
							className={tw`text-gray-900 dark:text-gray-300 text-2xl font-medium m-0 no-underline`}
							onClick={emptySearch}
						>
							Opener
						</a>
					</Link>
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

				<section className={tw`flex flex-col flex-1 px-0`}>
					{children}
				</section>
			</section>
		</>
	)
}

export default BaseLayout
