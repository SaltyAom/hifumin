import Toggler from '@components/toggler'

import { MenuToggleComponent } from './types'

const MenuLink: MenuToggleComponent = ({
	children,
	active,
	onSwitch,
	disabled = false
}) => (
	<section className={`menu ${disabled ? '-disabled' : ''}`}>
		{children}
		<Toggler onSwitch={onSwitch} active={active} />
	</section>
)

export default MenuLink
