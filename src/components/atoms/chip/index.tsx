import { useCallback } from 'react'
import type { MouseEventHandler } from 'react'

import tw, { combine } from '@tailwind'

import { X } from 'react-feather'

import type { ChipComponent } from './types'

const Chip: ChipComponent = ({
	value,
	onClick = null,
	active = false,
	removable = false,
	onRemove = null,
	className = ''
}) => {
	let handleClick: MouseEventHandler = useCallback(
		(event) => {
			if (onClick) onClick(value, event)
		},
		[onClick]
	)

	let handleRemove: MouseEventHandler = useCallback(
		(event) => {
			event.preventDefault()

			if (onRemove) onRemove(value)
		},
		[onRemove, value]
	)

	return (
		<button
			type="button"
			className={combine(
				tw`inline-flex flex-row items-center appearance-none text-xl py-1 border border-solid dark:border-gray-600 rounded-full transition-colors`,
				active
					? tw`text-white dark:text-gray-200 border-black bg-black focus:bg-black dark:bg-gray-600 dark:focus:bg-gray-600`
					: tw`text-gray-700 dark:text-gray-200 border-gray-200 bg-transparent focus:bg-gray-100 dark:focus:bg-gray-700`,
				removable ? tw`pl-3 pr-1` : tw`px-3`,
				onClick
					? tw`hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer`
					: tw`cursor-default`,
				className
			)}
			onClick={handleClick}
		>
			{value}
			{removable ? (
				<button
					className={tw`flex justify-center items-center text-gray-600 dark:text-gray-400 w-[28px] h-[28px] ml-1 p-1 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-500 border-0 transition-colors rounded-full cursor-pointer`}
					type="button"
					onClick={handleRemove}
				>
					<X />
				</button>
			) : null}
		</button>
	)
}

export default Chip
