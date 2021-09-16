import { useRef } from 'react'

import { useAtom } from 'jotai'
import { searchAtom } from '@stores/search'

import DiscoverLayout from '@layouts/discover'

import OpenGraph from '@atoms/opengraph'
import DiscoverResults from '@molecules/discover'

import { useComputedSpace } from '@services/hooks'

import tw from '@tailwind'
import { ProgressIndicator } from '@components/atoms'

const Discover = () => {
	let [keyword] = useAtom(searchAtom)

	let layout = useRef<HTMLElement>(null)
	let spaces = useComputedSpace(layout)

	return (
		<>
			<OpenGraph title={`${keyword || 'Discover'} - Opener Studio`} />
			<DiscoverLayout key="discover" layoutRef={layout}>
				{keyword ? (
					<section
						className={tw`flex justify-center items-center w-full h-full-app`}
					>
						<ProgressIndicator />
					</section>
				) : (
					<DiscoverResults spaces={spaces} layoutRef={layout} />
				)}
			</DiscoverLayout>
		</>
	)
}

export default Discover
