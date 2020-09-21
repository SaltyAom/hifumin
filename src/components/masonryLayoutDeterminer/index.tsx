import { useEffect, useMemo } from 'react'

import { useStoreon } from 'storeon/react'
import { MasonryEvent, MasonryStore } from '@stores'

import { getMasonryMargin } from '@libs'
import { useMasonry } from '@libs/hooks'

// ? Listener for masonry layout
const MasonryLayoutDeterminer = () => {
	let { dispatch } = useStoreon<MasonryStore, MasonryEvent>()

	let masonry = useMasonry(),
		margin = useMemo(() => getMasonryMargin(masonry), [masonry])

	useEffect(() => {
		dispatch('UPDATE_LAYOUT', {
			masonry,
			margin
		})
	}, [masonry])

	return null
}

export default MasonryLayoutDeterminer
