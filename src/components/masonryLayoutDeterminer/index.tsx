import { useEffect, useMemo } from 'react'

import { useStoreon } from 'storeon/react'
import { MasonryEvent, MasonryStore } from '@stores'

import { randomBetween } from '@libs'
import { useMasonry } from '@libs/hooks'

// ? Listener for masonry layout
const MasonryLayoutDeterminer = () => {
	let { dispatch } = useStoreon<MasonryStore, MasonryEvent>()

	let masonry = useMasonry()

	let margin = useMemo(() => {
		if (masonry === 2) return ['0px', '80px']

		let margin = Array(masonry).fill(0)

		return margin.map(() => randomBetween(0, 160) + 'px')
	}, [masonry])

	useEffect(() => {
		dispatch('UPDATE_LAYOUT', {
			masonry,
			margin
		})
	}, [masonry])

	return null
}

export default MasonryLayoutDeterminer
