import { Fragment } from 'react'

import { MenuLayoutComponent } from './types'

import styles from './menu-layout.module.sass'

const MenuLayout: MenuLayoutComponent = ({
	children,
	title,
	icon = null,
	id = ''
}) => {
	return (
		<Fragment>
			<h2 id={id} className={styles.title}>
				{icon}
				{title}
			</h2>
			<section className={styles.item}>{children}</section>
		</Fragment>
	)
}

export { ExternalLink, MenuLink, MenuToggle, MenuDetail, MenuContainer, MenuButton } from './menu'
export default MenuLayout
