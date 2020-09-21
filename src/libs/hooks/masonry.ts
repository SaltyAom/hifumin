import { useCallback, useEffect, useState, useRef } from 'react'

import { getMasonry } from '@libs/masonry'
import { isServer } from '@libs/is'

const useMasonry = () => {
	let [masonry, updateMasonry] = useState(getMasonry())

	let persistedListener = useRef<() => void>()

	let masonryListener = useCallback(() => {
		updateMasonry(getMasonry())
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
