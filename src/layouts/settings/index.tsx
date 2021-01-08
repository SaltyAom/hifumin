import { MouseEvent, Fragment } from 'react'

import { OpenGraph } from '@components'

import { useRouter } from 'next/router'

import { ChevronLeft } from '@icons'

import styles from './settings-layout.module.sass'

import { SettingsLayoutComponent } from './types'

const SettingsLayout: SettingsLayoutComponent = ({
	children,
	title = 'Settings'
}) => {
	let { back } = useRouter()

	const backToPreviousPage = (
		event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
	) => {
		event.preventDefault()
		back()
	}

	return (
		<Fragment>
			<OpenGraph title={title} description={`Opener Studio ${title}`} />
			<main id={styles['settings']}>
				<a
					className={styles.back}
					href="/"
					onClick={backToPreviousPage}
					aria-label="Back to previous page"
				>
					<ChevronLeft /> Back
				</a>
				<h1 className={styles.title}>{title}</h1>
				<section className={styles.menu}>{children}</section>
			</main>
		</Fragment>
	)
}

export {
	default as MenuLayout,
	MenuLink,
	MenuToggle,
	MenuDetail,
	MenuContainer,
	MenuButton,
	ExternalLink
} from './menuLayout'
export default SettingsLayout
