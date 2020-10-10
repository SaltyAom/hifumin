import { Fragment } from 'react'

import { OpenGraph } from '@components'

import { useRouter } from 'next/router'

import { ChevronLeft } from '@icons'

import './settings-layout.styl'

const SettingsLayout = ({ children, title = 'Settings' }) => {
	let { back } = useRouter()

	const backToPreviousPage = (event) => {
		event.preventDefault()
		back()
	}

	return (
		<Fragment>
			<OpenGraph title={title} description={`Opener Studio ${title}`} />
			<main id="settings">
				<a
					className="back"
					href="/"
					onClick={backToPreviousPage}
					aria-label="Back to previous page"
				>
					<ChevronLeft /> Back
				</a>
				<h1 className="title">{title}</h1>
				<section className="menu">{children}</section>
			</main>
		</Fragment>
	)
}

export {
	default as MenuLayout,
	MenuLink,
	MenuToggle,
	MenuDetail,
	MenuContainer
} from './menuLayout'
export default SettingsLayout
