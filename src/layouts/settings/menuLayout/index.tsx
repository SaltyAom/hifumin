import { Fragment } from 'react'

import { MenuLayoutComponent } from './types'

import './menu-layout.sass'

const MenuLayout: MenuLayoutComponent = ({
	children,
	title,
	icon = null,
	id = ''
}) => {
	return (
		<Fragment>
			<h2 id={id} className="title">
				{icon}
				{title}
			</h2>
			<section className="item">{children}</section>
		</Fragment>
	)
}

export { ExternalLink, MenuLink, MenuToggle, MenuDetail, MenuContainer, MenuButton } from './menu'
export default MenuLayout
