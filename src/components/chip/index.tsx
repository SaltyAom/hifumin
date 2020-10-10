import './chip.styl'

const Chip = ({ children, onClick, active }) => {
	let handleClick = () => {
		onClick(active)
	}

	return (
		<button
			className={`chip ${active ? '-active' : ''}`}
			onClick={handleClick}
		>
			{children}
		</button>
	)
}

export default Chip
