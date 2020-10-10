import Toggler from '@components/toggler'

import { MenuToggleComponent } from './types'

const MenuLink: MenuToggleComponent = ({ children, active, onSwitch }) => (
	<section className="menu">
		{children}
		<Toggler onSwitch={onSwitch} active={active} />
	</section>
)

export default MenuLink
