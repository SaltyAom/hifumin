import { FunctionComponent, useReducer } from 'react'

import tw, { combine } from '@services/tailwind'

import { Grid, Menu } from 'react-feather'

import styles from './base.module.sass'

export const BaseLayout: FunctionComponent = ({ children }) => {
	let [fullSide, toggleFullSide] = useReducer((v) => !v, true)

	return (
		<>
			<aside
				className={combine(
					styles.aside,
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
						className={tw`flex justify-center items-center appearance-none mr-2 p-3 mr-text-gray-900 focus:text-gray-900 border-0 bg-transparent hover:bg-gray-100 rounded-full cursor-pointer`}
						onClick={toggleFullSide}
					>
						<Menu width={26} height={26} />
					</button>
					Opener
				</h1>
				{['Discover', 'Recent', 'Settings', 'Collection'].map(
					(title) => {
						let isActive = 'Discover' === title

						let className = ''

						if (isActive) className = 'text-gray-900 border-black'
						else
							className =
								'text-gray-400 border-transparent hover:text-gray-700 focus:text-gray-700 transition-colors'

						return (
							<a
								key={title}
								href="/"
								className={combine(
									styles.tab,
									tw(
										`flex flex-row items-center pl-6 py-2 my-1 font-medium border-0 border-r-4 border-solid cursor-pointer no-underline ${className}`
									)
								)}
							>
								<Grid
									className={combine(
										tw`mr-6`,
										styles['icon']
									)}
								/>
								{title}
							</a>
						)
					}
				)}
			</aside>
			<section className={tw`flex flex-col flex-1 px-6`}>
				{children}
			</section>
		</>
	)
}
