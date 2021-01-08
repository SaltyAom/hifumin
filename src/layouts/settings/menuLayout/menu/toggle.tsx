import Toggler from '@components/toggler'

import { MenuToggleComponent } from './types'

import styles from './menu.module.sass'

const MenuLink: MenuToggleComponent = ({
	children,
	active,
	onSwitch,
	disabled = false
}) => (
	<section
		className={`${styles.menu} ${disabled ? styles['-disabled'] : ''}`}
	>
		{children}
		<Toggler onSwitch={onSwitch} active={active} />
	</section>
)

export default MenuLink
