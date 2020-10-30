import { useEffect, useMemo } from 'react'

import { useStoreon } from 'storeon/react'
import { MasonryEvent, MasonryStore } from '@stores'
import Masonry from '@stores/masonry/constant'

import { getMasonryMargin } from '@libs'
import { useMasonry } from '@libs/hooks'

// ? Listener for masonry layout
const MasonryLayoutDeterminer = () => {
	let { dispatch } = useStoreon<MasonryStore, MasonryEvent>()

	let masonry = useMasonry(),
		margin = useMemo(() => getMasonryMargin(masonry), [masonry])

	useEffect(() => {
		dispatch(Masonry.update, {
			masonry,
			margin
		})
	}, [masonry])

	return null
}

export default MasonryLayoutDeterminer
