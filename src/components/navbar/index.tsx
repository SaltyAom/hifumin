import { useCallback, useEffect, useRef, useState } from 'react'

import { useStoreon } from 'storeon/react'
import { SettingEvent, SettingStore } from '@stores'
import { Setting } from '@stores/constant'

import Link from 'next/link'

import { Plus, Settings } from '@icons'

import './navbar.styl'

const Navbar = () => {
	let { dispatch, safeMode } = useStoreon<SettingStore, SettingEvent>(
		'safeMode'
	)

	let [shouldShow, updateShouldShow] = useState(true)

	let previousY = useRef(0),
		lastY = useRef(0)

	useEffect(() => {
		let determineNavbarDisplay = () => {
			previousY.current = window.scrollY

			let scrollY = +window.scrollY

			setTimeout(() => {
				if (scrollY === 0) return updateShouldShow(true)

				if (previousY.current !== scrollY) return

				updateShouldShow(scrollY <= lastY.current)

				lastY.current = scrollY
			}, 16)
		}

		window.addEventListener('scroll', determineNavbarDisplay, {
			passive: true
		})

		return () =>
			window.removeEventListener('scroll', determineNavbarDisplay)
	}, [])

	let toggleSafeMode = useCallback(() => {
		dispatch(Setting.SAFE_MODE, !safeMode)
	}, [safeMode])

	return (
		<nav id="navbar" className={shouldShow ? '' : '-hidden'}>
			<Link href="/">
				<a className="link">
					<h1 className="title">Opener</h1>
				</a>
			</Link>
			<section className="tools">
				<button
					title={`Turn ${safeMode ? 'on' : 'off'} safe mode`}
					aria-label={`Turn ${safeMode ? 'on' : 'off'} safe mode`}
					className="tab safe-mode"
					onClick={toggleSafeMode}
				>
					18
					<Plus />
					<div className={`strike ${!safeMode ? '-hidden' : ''}`} />
				</button>
				<Link href="/settings" aria-label="Settings">
					<a className="tab">
						<Settings />
					</a>
				</Link>
			</section>
		</nav>
	)
}

export default Navbar
