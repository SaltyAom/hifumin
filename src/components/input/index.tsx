import { FormEvent } from 'react'

import { InputComponent } from './types'

import styles from './input.module.sass'

const Input: InputComponent = ({
	children = null,
	value = '',
	placeholder = 'Input',
	onChange = (event: FormEvent<HTMLElement>) => {},
	enterKeyHint = 'enter'
}) => {
	return (
		<section className={styles['text-input']} defaultValue={value}>
			<input
				className={styles.input}
				type="text"
				name={placeholder}
				aria-label={placeholder}
				placeholder=" "
				value={value}
				onChange={onChange}
				// @ts-ignore
				enterkeyhint={enterKeyHint}
			/>
			<p className={styles.placeholder}>{placeholder}</p>
			{children}
		</section>
	)
}

export default Input
