import { useReducer } from 'react'

const Section = ({ children }) => {
	const [isCollapse, toggleCollapse] = useReducer(
		(collapse) => !collapse,
		true
	)

	return (
		<section
			tabIndex={0}
			aria-label={`Tab to ${isCollapse ? 'close' : 'open'}`}
            className={`col ${isCollapse ? '-collapse' : ''}`}
            onClick={toggleCollapse}
		>
			{children}
		</section>
	)
}

export default Section
