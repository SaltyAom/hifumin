import { MenuButtonComponent } from './types'

import styles from './menu.module.sass'

const MenuButton: MenuButtonComponent = ({
	children,
	detail,
	onClick,
	disabled = false
}) => {
	return (
		<div
			className={`${styles.menu} ${styles['-link']} ${
				disabled ? styles['-disabled'] : ''
			}`}
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
