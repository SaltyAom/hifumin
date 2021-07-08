import tw, { combine } from '@tailwind'

import type { TextBoxComponent } from './types'

import styles from './textbox.module.sass'

const TextBox: TextBoxComponent = ({
	className = '',
	name = '',
	placeholder = '',
	onChange = () => {},
	suffix = null,
	inputRef = null
}) => {
	let id = `textbox-${name}`

	return (
		<section
			className={combine(
				tw`relative flex flex-row items-center text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 w-full mt-8 mb-2 px-3 py-2 rounded`,
				className
			)}
		>
			<input
				ref={inputRef}
				type="text"
				id={id}
				name={name}
				className={combine(
					tw`text-inherit placeholder-transparent appearance-none text-xl border-0 bg-transparent overflow-hidden`,
					suffix ? styles['with-suffix'] : '',
					styles.textbox
				)}
				onChange={onChange}
				placeholder={placeholder}
				required
			/>
			<label
				className={combine(
					tw`absolute placeholder-gray-400 dark:placeholder-gray-500 text-xl opacity-75`,
					styles.placeholder
				)}
				htmlFor={id}
			>
				{placeholder}
			</label>
			{suffix ? (
				<button
					className={tw`appearance-none w-[36px] placeholder-gray-500 dark:placeholder-gray-400 dark:text-gray-200 border-0 bg-transparent cursor-pointer`}
					type="submit"
				>
					{suffix}
				</button>
			) : null}
		</section>
	)
}

export default TextBox
