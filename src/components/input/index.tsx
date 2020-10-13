import { FormEvent } from 'react'

import './input.styl'

const Input = ({
	placeholder = 'Input',
	onChange = (event: FormEvent<HTMLElement>) => {},
	value = '',
	children = null
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
			/>
			<p className="placeholder">{placeholder}</p>
			{children}
		</section>
	)
}

export default Input
