import { isServer, randomBetween } from '@libs'

export const getMasonry = () => {
	if (isServer) return 2

	let width = window.innerWidth

	if (width <= 568) return 2

	if (width <= 768) return 4

	return Math.floor(width / 192)
},
	getMasonryMargin = (masonry: number) => {
		if (masonry === 2) return ['0px', '80px']

		let margin = Array(masonry).fill(0)

		return margin.map(() => randomBetween(0, 160) + 'px')
	}