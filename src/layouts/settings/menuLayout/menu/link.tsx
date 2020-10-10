import Link from 'next/link'

import { ChevronRight } from '@icons'

import { MenuLinkComponent } from './types'

const MenuLink: MenuLinkComponent = ({ children, href, disabled = false }) => {
	return (
		<Link href={href}>
			<a
				className={`menu -link ${disabled ? '-disabled' : ''}`}
				role="section"
			>
				{children}
				<ChevronRight />
			</a>
		</Link>
	)
}

export default MenuLink
