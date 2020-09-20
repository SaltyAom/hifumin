import { useCallback, useEffect, useState, useRef } from 'react'

import { isServer } from '@libs/is'

const useMasonry = () => {
	let [masonry, updateMasonry] = useState(2)

	let persistedListener = useRef<() => void>()

	let calculateMasonry = useCallback(() => {
		if (isServer) return

		let width = window.innerWidth

		if (width <= 568) return 2

		if (width <= 768) return 4

		return Math.floor(width / 240)
	}, [])

	let masonryListener = useCallback(() => {
		updateMasonry(calculateMasonry())
	}, [])

	useEffect(() => {
		if (isServer) return

        masonryListener()
		window.addEventListener('resize', masonryListener)

		persistedListener.current = masonryListener

		return () =>
			window.removeEventListener('resize', persistedListener.current)
	}, [])

	return masonry
}

export default useMasonry
