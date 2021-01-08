import { FormEvent, useCallback, useState } from 'react'

import { Input } from '@components'

import { Plus } from '@icons'

import { CustomTagFormComponent } from './types'

import './custom-tag-form.sass'

const CustomTagForm: CustomTagFormComponent = ({
	onSubmit,
	placeholder = 'Tag',
	enterKeyHint = 'enter',
}) => {
	let [newPreference, updatePreference] = useState('')

	const addNewTag = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!newPreference || newPreference === null) return

		if (newPreference.length > 2)
			onSubmit(newPreference)

		updatePreference('')
	}

	const handleChange = useCallback((event) => {
		updatePreference(event.currentTarget.value)
	}, [])

	return (
		<form id="custom-tag" onSubmit={addNewTag}>
			<Input
				placeholder={placeholder}
				value={newPreference}
				onChange={handleChange}
				enterKeyHint={enterKeyHint}
			>
				<button id="add-tag">
					<Plus />
				</button>
			</Input>
		</form>
	)
}

export default CustomTagForm
