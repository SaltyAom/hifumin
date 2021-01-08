import { FormEvent } from 'react'

import { InputComponent } from './types'

import './input.sass'

const Input: InputComponent = ({
	children = null,
	value = '',
	placeholder = 'Input',
	onChange = (event: FormEvent<HTMLElement>) => {},
	enterKeyHint = 'enter'
}) => {
	return (
		<section className="text-input" defaultValue={value}>
			<input
				className="input"
				type="text"
				name={placeholder}
				aria-label={placeholder}
				placeholder=" "
				value={value}
				onChange={onChange}
				// @ts-ignore
				enterkeyhint={enterKeyHint}
			/>
			<p className="placeholder">{placeholder}</p>
			{children}
		</section>
	)
}

export default Input
