import Link from 'next/link'

import { ChevronRight } from '@icons'

import { MenuLinkComponent } from './types'

import styles from './menu.module.sass'

const ExternalLink: MenuLinkComponent = ({
	children,
	href,
	disabled = false
}) => {
	return (
		<Link href={href}>
			<a
				className={`${styles.menu} ${styles['-link']} ${
					disabled ? styles['-disabled'] : ''
				}`}
				href="https://ko-fi.com/saltyaom"
				target="_blank"
				rel="norefferer noreopener"
			>
				{children}
				<ChevronRight />
			</a>
		</Link>
	)
}

export default ExternalLink
