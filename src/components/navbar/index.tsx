import { useEffect, useRef, useState } from 'react'

import { useStoreon } from 'storeon/react'
import { SettingEvent, SettingStore } from '@stores'

import Link from 'next/link'

import PlusIcon from './icons/plus'

import { getPersist } from '@libs'

import './navbar.styl'

const Navbar = () => {
	let { dispatch, safeMode } = useStoreon<SettingStore, SettingEvent>(
		'safeMode'
	)

	let [localSafeMode, updateLocalSafeMode] = useState(false),
		[shouldShow, updateShouldShow] = useState(true)

	let previousY = useRef(0),
		lastY = useRef(0)

	useEffect(() => {
		updateLocalSafeMode(getPersist('safeMode'))

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

	useEffect(() => {
		updateLocalSafeMode(safeMode)
	}, [safeMode])

	let toggleSafeMode = () => {
		dispatch('UPDATE_SAFE_MODE', !safeMode)
	}

	return (
		<nav id="navbar" className={shouldShow ? '' : '-hidden'}>
			<Link href="/">
				<a className="link">
					<h1 className="title">Opener Studio</h1>
				</a>
			</Link>
			<section className="tools">
				<button className="tab safe-mode" onClick={toggleSafeMode}>
					18
					<PlusIcon />
					<div
						className={`strike ${!localSafeMode ? '-hidden' : ''}`}
					/>
				</button>
			</section>
		</nav>
	)
}

export default Navbar
