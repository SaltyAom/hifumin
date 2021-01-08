import { MouseEvent } from 'react'

import { Remove } from '@icons'

import { RemovableChipComponent } from './types'

import Chip from '../..'

import styles from './removable.module.sass'

const RemovableChip: RemovableChipComponent = ({
	children,
	onClick = () => null
}) => {
	const mapPreference = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		let element: HTMLElement = event.currentTarget

		onClick(element.previousSibling?.textContent || '')
	}

	return (
		<Chip className={styles['removable']}>
			{children}
			<button className={styles.remove} onClick={mapPreference}>
				<Remove />
			</button>
		</Chip>
	)
}

export default RemovableChip
