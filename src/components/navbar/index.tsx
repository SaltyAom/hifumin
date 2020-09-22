import { useEffect, useState } from 'react'

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

	let [localSafeMode, updateLocalSafeMode] = useState(false)

	useEffect(() => {
		updateLocalSafeMode(getPersist('safeMode'))
    }, [])
    
    useEffect(() => {
        updateLocalSafeMode(safeMode)
    }, [safeMode])

	let toggleSafeMode = () => {
		dispatch('UPDATE_SAFE_MODE', !safeMode)
	}

	return (
		<nav id="navbar">
			<Link href="/">
				<a className="link">
					<h1 className="title">Opener Studio</h1>
				</a>
			</Link>
			<section className="tools">
				<button className="tab safe-mode" onClick={toggleSafeMode}>
					18
					<PlusIcon />
					<div className={`strike ${!localSafeMode ? '-hidden' : ''}`} />
				</button>
			</section>
		</nav>
	)
}

export default Navbar
