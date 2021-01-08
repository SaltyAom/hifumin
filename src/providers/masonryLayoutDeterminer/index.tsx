import { useEffect, useMemo } from 'react'

import { useStoreon } from 'storeon/react'
import { MasonryEvent, MasonryStore } from '@models'
import Masonry from '@models/masonry/constant'

import { getMasonryMargin } from '@services'
import { useMasonry } from '@services/hooks'

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
