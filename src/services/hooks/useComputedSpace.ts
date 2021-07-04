import { useState, useEffect, RefObject, useCallback } from 'react'

const cardWidth = 220

const useComputedSpace = (layout: RefObject<HTMLElement>) => {
	let [spaces, updateSpaces] = useState(4)

	let calculateLayout = useCallback(() => {
		let width = (layout.current?.clientWidth ?? cardWidth) - 48

		if (width < cardWidth) width = cardWidth

		let available: number

		if (width < 568) available = 2
		else if (width < 768) available = 3
		else available = Math.floor(width / cardWidth)

		updateSpaces(available)
	}, [])

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