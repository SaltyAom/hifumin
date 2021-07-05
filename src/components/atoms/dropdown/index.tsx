import { useCallback, useReducer, useRef } from 'react'

import { ChevronDown } from 'react-feather'

import tw, { combine } from '@tailwind'

import type { DropDownComponent } from './types'

import styles from './dropdown.module.sass'

const DropDown: DropDownComponent = ({ options, selected, update }) => {
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
		<section
			className={tw`relative flex flex-col justify-center mt-2 sm:mt-0 sm:pl-4 w-[18ch]`}
		>
			<button
				ref={select}
				className={tw`appearance-none flex flex-row items-center text-lg text-gray-700 dark:text-gray-200 font-semibold w-full m-0 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-50 focus:bg-gray-50 dark:hover:bg-gray-600 dark:focus:bg-gray-600 border-0 rounded transition-colors cursor-pointer`}
				onClick={toggle}
				type="button"
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
						tw`flex flex-col bg-white dark:bg-gray-700 rounded overflow-hidden`
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
										? tw`text-gray-300 dark:text-gray-500 cursor-not-allowed`
										: tw`hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-600 dark:focus:bg-gray-600 cursor-pointer`,
									tw`appearance-none text-lg text-gray-900 dark:text-gray-300 bg-transparent border-0 rounded-none outline-none transition-colors`
								)}
								type="button"
								onClick={handleSelect(option)}
							>
								{option}
							</button>
						)
					})}
				</div>
			</section>
		</section>
	)
}

export default DropDown
