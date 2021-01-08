import { ChipComponent } from './types'

import styles from './chip.module.sass'

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
			className={`${styles.chip} ${className} ${active ? styles['-active'] : ''}`}
			onClick={handleClick}
		>
			{children}
		</button>
	)
}

export { RemovableChip } from './variants'

export default Chip
