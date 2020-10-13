import Chip from '../..'

import { Remove } from '@icons'

import { RemovableChipComponent } from './types'

import './removable.styl'

const RemovableChip: RemovableChipComponent = ({
	children,
	onClick = () => null
}) => {
    const mapPreference = (event) => {
        let element: HTMLElement = event.currentTarget

        onClick(element.previousSibling.textContent)
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
