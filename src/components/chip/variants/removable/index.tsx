import { MouseEvent } from 'react'

import Chip from '../..'

import { Remove } from '@icons'

import { RemovableChipComponent } from './types'

import './removable.sass'

const RemovableChip: RemovableChipComponent = ({
	children,
	onClick = () => null
}) => {
	const mapPreference = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		let element: HTMLElement = event.currentTarget

		onClick(element.previousSibling?.textContent || '')
	}

	return (
		<Chip className="-removable">
			{children}
			<button className="remove" onClick={mapPreference}>
				<Remove />
			</button>
		</Chip>
	)
}

export default RemovableChip
