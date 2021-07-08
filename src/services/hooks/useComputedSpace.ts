import { isServer } from '@services/validation'
import { useState, useEffect, RefObject, useCallback } from 'react'

const cardWidth = 220

const useComputedSpace = (layout: RefObject<HTMLElement>) => {
	let calculateLayout = useCallback(() => {
		let width =
			(layout.current?.clientWidth ?? window.innerWidth - 64 ?? 1920) - 48

		if (width < cardWidth) width = cardWidth

		let available: number

		if (width < 568) available = 2
		else if (width < 768) available = 3
		else available = Math.floor(width / cardWidth)

		// eslint-disable-next-line no-use-before-define
		updateSpaces(available)
	}, [])

	let [spaces, updateSpaces] = useState(6)

	useEffect(() => {
		calculateLayout()
		window.addEventListener('resize', calculateLayout, {
			passive: true
		})

		return () => {
			window.removeEventListener('resize', calculateLayout)
		}
	}, [])

	return spaces
}

export default useComputedSpace
