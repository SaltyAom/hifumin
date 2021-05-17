import { useState, useEffect, RefObject, useCallback } from 'react'

let cardWidth = 220

export const useComputedSpace = (layout: RefObject<HTMLElement>) => {
	let [spaces, updateSpaces] = useState(4)

	useEffect(() => {
		calculateLayout()
		window.addEventListener('resize', calculateLayout)
	}, [])

	let calculateLayout = useCallback(() => {
		let width = (layout.current?.clientWidth ?? cardWidth) - 48

		if (width < cardWidth) width = cardWidth

		let available: number

		if (width < 568) available = 2
		else if (width < 768) available = 3
		else available = Math.floor(width / cardWidth)

		updateSpaces(available)
	}, [])

	return spaces
}
