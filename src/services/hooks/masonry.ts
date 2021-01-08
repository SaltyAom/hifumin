import { useCallback, useEffect, useState, useRef } from 'react'

import { getMasonry } from '@services/masonry'
import { isServer } from '@services/is'

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

		return () => {
			if (persistedListener.current)
				window.removeEventListener('resize', persistedListener.current)
		}
	}, [])

	return masonry
}

export default useMasonry
