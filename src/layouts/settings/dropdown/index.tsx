import { useCallback, useReducer, useRef } from 'react'

import { ChevronDown } from 'react-feather'

import tw, { combine } from '@tailwind'

import { VerticalSettingLayout } from '../vertical'

import type { DropDownSettingComponent } from './types'

import styles from './dropdown.module.sass'

export const DropDownSettingLayout: DropDownSettingComponent = ({
	children,
	options,
	selected,
	update,
	footer
}) => {
	let [isOpen, toggle] = useReducer((v) => !v, false)
	let select = useRef<HTMLButtonElement>(null)

	let handleSelect = useCallback(
		(option: any) => () => {
			update(option)
			toggle()
			select.current?.focus()
		},
		[update]
	)

	return (
		<VerticalSettingLayout
			footer={footer}
			action={
				<section
					className={tw`relative flex flex-col justify-center mt-2 sm:mt-0 sm:pl-4 w-[18ch]`}
				>
					<button
						ref={select}
						className={tw`appearance-none flex flex-row items-center text-lg text-gray-700 font-semibold w-full m-0 py-2 bg-gray-100 hover:bg-gray-50 focus:bg-gray-50 border-0 rounded transition-colors cursor-pointer`}
						onClick={toggle}
					>
						<span className={tw`flex-1`}>{selected}</span>
						<ChevronDown />
					</button>
					<section
						className={tw(
							`absolute ${
								isOpen ? 'z-20' : 'z-10'
							} top-10 pt-2 w-full pr-4`
						)}
					>
						<div
							className={combine(
								styles.dropdown,
								isOpen ? styles['dropdown-open'] : '',
								tw`flex flex-col bg-white rounded overflow-hidden`
							)}
							style={{
								height: isOpen ? options.length * 48 + 8 : 0
							}}
						>
							{options.map((option) => {
								let isSelected = option === selected

								return (
									<button
										disabled={!isOpen || isSelected}
										className={combine(
											styles.option,
											isSelected
												? ''
												: tw`hover:bg-gray-100 focus:bg-gray-100`,
											tw`appearance-none text-lg bg-transparent border-0 rounded-none outline-none transition-colors cursor-pointer`
										)}
										onClick={handleSelect(option)}
									>
										{option}
									</button>
								)
							})}
						</div>
					</section>
				</section>
			}
		>
			{children}
		</VerticalSettingLayout>
	)
}
