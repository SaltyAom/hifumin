import { MenuContainerComponent } from './types'

import styles from './menu.module.sass'

const MenuContainer: MenuContainerComponent = ({
	children,
	disabled = false
}) => (
	<section className={`${styles.container} ${disabled ? styles['-disabled'] : ''}`}>
		{children}
	</section>
)

export default MenuContainer
