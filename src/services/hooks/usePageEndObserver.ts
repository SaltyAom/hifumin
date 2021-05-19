import { useEffect, useRef } from 'react'

export const usePageEndObserver = (callback: Function, shouldStop = false) => {
	let previousObserver = useRef<() => Promise<void>>()
	let isLoading = useRef(false)

	useEffect(() => {
		watchPageEnd()

		return () => {
			stopWatchingPageEnd()
		}
	}, [callback])

	let watchPageEnd = () => {
		stopWatchingPageEnd()

		requestAnimationFrame(() => {
			window.addEventListener('scroll', pageEndObserver, {
				passive: true
			})
		})
	}

	let stopWatchingPageEnd = () => {
		if(previousObserver.current)
			window.removeEventListener('scroll', previousObserver.current)

		previousObserver.current = pageEndObserver
	}

	let pageEndObserver = async () => {
		if (shouldStop) return

		stopWatchingPageEnd()

		let page = document.documentElement.scrollHeight
		let current = document.documentElement.scrollTop
		let viewport = window.innerHeight

		let nearEnd = page - viewport * 2

		if (current < nearEnd) return watchPageEnd()

		isLoading.current = true

		await callback()

		isLoading.current = false

		watchPageEnd()
	}
}
