import { useEffect, useRef } from 'react'

import { useAtom } from 'jotai'
import { searchAtom } from '@stores/search'

import DiscoverLayout from '@layouts/discover'

import OpenGraph from '@atoms/opengraph'
import DiscoverResults from '@molecules/discover'

import { useComputedSpace } from '@services/hooks'

const Discover = () => {
	let [keyword, updateKeyword] = useAtom(searchAtom)

	let layout = useRef<HTMLElement>(null)
	let spaces = useComputedSpace(layout)

	useEffect(() => {
		updateKeyword('')
	}, [])

	return (
		<>
			<OpenGraph title={`${keyword || 'Discover'} - Opener Studio`} />
			<DiscoverLayout key="discover" layoutRef={layout}>
				<DiscoverResults spaces={spaces} layoutRef={layout} />
			</DiscoverLayout>
		</>
	)
}

export default Discover
