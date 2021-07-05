import { useMemo, useRef } from 'react'
import type { FunctionComponent } from 'react'

import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'

import type { CombinedError } from 'urql'

import { useAtom } from 'jotai'
import { searchAtom } from '@stores/search'

import DiscoverLayout from '@layouts/discover'

import OpenGraph from '@atoms/opengraph'
import DiscoverResults from '@molecules/discover'

import { useComputedSpace } from '@services/hooks'
import { getPreviews } from '@services/graphql'
import { randomPick } from '@services/random'
import { tags } from '@services/data'

import type { Stories } from '@types'

const SearchResults = dynamic(() => import('@components/molecules/search'))

export interface DiscoverProps {
	stories: Stories
	// ? Also used in search page
	keyword?: string
	error?: CombinedError | null
}

const Discover: FunctionComponent<DiscoverProps> = ({ stories: initial }) => {
	let [keyword] = useAtom(searchAtom)

	let layout = useRef<HTMLElement>(null)
	let spaces = useComputedSpace(layout)

	let search = useMemo(() => <SearchResults spaces={spaces} />, [spaces])
	let discover = useMemo(
		() => <DiscoverResults initial={initial} spaces={spaces} />,
		[spaces, initial]
	)

	return (
		<>
			<OpenGraph title={`${keyword || 'Search'} - Opener Studio`} />
			<DiscoverLayout layoutRef={layout}>
				{keyword ? search : discover}
			</DiscoverLayout>
		</>
	)
}

export const getStaticProps: GetStaticProps<DiscoverProps> = async () => {
	let stories = await getPreviews({
		keyword: randomPick(tags)
	})

	return {
		props: {
			stories: stories.data?.searchHentai.data ?? [],
			error: stories.error || null
		},
		revalidate: 3600 * 3
	}
}

export default Discover
