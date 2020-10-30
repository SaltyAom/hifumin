import { useCallback, useEffect, useState, useRef } from 'react'

import { getMasonry } from '@libs/masonry'
import { isServer } from '@libs/is'

const useMasonry = () => {
	let [masonry, updateMasonry] = useState(getMasonry())

	let persistedListener = useRef<() => void>()

	let masonryListener = useCallback(() => {
		setTimeout(() => {
			updateMasonry(getMasonry())
			window.addEventListener('resize', masonryListener, {
				once: true
			})
		}, 16) // 60 Fps
	}, [])

	useEffect(() => {
		if (isServer) return

		masonryListener()
		window.addEventListener('resize', masonryListener, {
			once: true
		})

		persistedListener.current = masonryListener

		return () =>
			window.removeEventListener('resize', persistedListener.current)
	}, [])

	return masonry
}

export default useMasonry
