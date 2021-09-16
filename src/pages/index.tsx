import { useRef } from 'react'

import dynamic from 'next/dynamic'

import { useAtom } from 'jotai'
import { searchAtom } from '@stores/search'

import DiscoverLayout from '@layouts/discover'

import OpenGraph from '@atoms/opengraph'
import DiscoverResults from '@molecules/discover'

import { useComputedSpace } from '@services/hooks'

const SearchResults = dynamic(() => import('@components/molecules/search'))

const Discover = () => {
	let [keyword] = useAtom(searchAtom)

	let layout = useRef<HTMLElement>(null)
	let spaces = useComputedSpace(layout)

	return (
		<>
			<OpenGraph title={`${keyword || 'Discover'} - Opener Studio`} />
			<DiscoverLayout key="discover" layoutRef={layout}>
				{keyword ? (
					<SearchResults spaces={spaces} layoutRef={layout} />
				) : (
					<DiscoverResults spaces={spaces} layoutRef={layout} />
				)}
			</DiscoverLayout>
		</>
	)
}

export default Discover
