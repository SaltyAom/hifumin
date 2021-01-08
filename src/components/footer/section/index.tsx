import { useReducer } from 'react'

import { FooterSectionComponent } from './types'

const Section: FooterSectionComponent = ({ children }) => {
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
