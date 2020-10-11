import { Fragment } from 'react'

import { MenuLayoutComponent } from './types'

import './menu-layout.styl'

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

export { MenuLink, MenuToggle, MenuDetail, MenuContainer } from './menu'
export default MenuLayout
