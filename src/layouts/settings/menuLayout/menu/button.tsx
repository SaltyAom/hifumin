import { ButtonHTMLAttributes } from 'react'
import { MenuButtonComponent } from './types'

const MenuButton: MenuButtonComponent = ({
	children,
	detail,
	onClick,
	disabled = false
}) => {
	return (
		<div
			className={`menu -link ${disabled ? '-disabled' : ''}`}
			role="button"
			onClick={onClick}
			tabIndex={0}
		>
			{children}
			<span>{detail}</span>
		</div>
	)
}

export default MenuButton
