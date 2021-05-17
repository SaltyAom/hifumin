import { useEffect, useRef } from 'react'

export const usePageEndObserver = (callback: Function) => {
	let requested = useRef(false)

	let watchPageEnd = () => {
		requestAnimationFrame(() => {
			window.addEventListener('scroll', pageEndObserver, {
				passive: true
			})
		})
	}

	let stopWatchingPageEnd = () => {
		window.removeEventListener('scroll', pageEndObserver)
	}

	let pageEndObserver = async () => {
		stopWatchingPageEnd()

		let page = document.documentElement.scrollHeight
		let current = document.documentElement.scrollTop
		let viewport = window.innerHeight

		let nearEnd = page - viewport * 2

		if (current < nearEnd) return watchPageEnd()

		requested.current = true

		await callback()

		requested.current = false

		watchPageEnd()
	}

	useEffect(() => {
		watchPageEnd()

		return () => {
			stopWatchingPageEnd()
		}
	}, [callback])
}
