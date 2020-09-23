import { isServer, randomBetween } from '@libs'

export const getMasonry = () => {
		if (isServer) return 2

		let width = window.innerWidth,
			space = 280

		if (width <= 300) return 1
		if (width <= 660) return 2
		if (width <= space * 3) return 3

		return Math.floor(width / space)
	},
	getMasonryMargin = (masonry: number) => {
		if (masonry === 2) return ['0px', '80px']

		let margin = Array(masonry).fill(0)

		return margin.map(() => randomBetween(0, 160) + 'px')
	}
