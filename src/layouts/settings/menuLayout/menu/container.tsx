import { MenuContainerComponent } from './types'

const MenuContainer: MenuContainerComponent = ({
	children,
	disabled = false
}) => (
	<section className={`container ${disabled ? '-disabled' : ''}`}>
		{children}
	</section>
)

export default MenuContainer
