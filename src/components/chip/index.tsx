import { ChipComponent } from './types'

import './chip.sass'

const Chip: ChipComponent = ({
	children,
	onClick = () => {},
	active = false,
	className = ''
}) => {
	let handleClick = () => {
		onClick(active)
	}

	return (
		<button
			className={`chip ${className} ${active ? '-active' : ''}`}
			onClick={handleClick}
		>
			{children}
		</button>
	)
}

export { RemovableChip } from './variants'

export default Chip
