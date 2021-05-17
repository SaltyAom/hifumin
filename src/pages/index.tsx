import { FunctionComponent, useMemo, useRef } from 'react'
import { GetStaticProps } from 'next'

import tw from '@tailwind'

import { BaseLayout } from '@layouts/base'
import { DiscoverLayout, DiscoverCard } from '@layouts/discover'

import { splitChunk } from '@services/array'

import {
	useComputedSpace,
	useHentaiCollection,
	usePageEndObserver
} from '@services/hooks'
import { query, getPreviews } from '@services/graphql'
import type {
	SearchHentai,
	SearchHentaiVariables
} from '@services/graphql/types'
import { randomPick } from '@services/random'
import { tags } from '@services/data'

import type { Stories } from '@types'

interface DiscoverProps {
	stories: Stories
}

const Discover: FunctionComponent<DiscoverProps> = ({ stories: initial }) => {
	let layout = useRef<HTMLElement>(null)

	let [stories, fetch] = useHentaiCollection(initial)
	let spaces = useComputedSpace(layout)

	let storyGroup = useMemo(
		() => splitChunk(stories, spaces),
		[stories, spaces]
	)

	usePageEndObserver(fetch)

	return (
		<BaseLayout>
			<DiscoverLayout layoutRef={layout}>
				{storyGroup.map((group, index) => (
					<section
						key={index}
						className={tw`flex flex-col flex-1 px-2`}
					>
						{group.map((story) => (
							<DiscoverCard key={story.id} story={story} />
						))}
					</section>
				))}
			</DiscoverLayout>
		</BaseLayout>
	)
}

export const getStaticProps: GetStaticProps<DiscoverProps> = async () => {
	let stories = await query<SearchHentai, SearchHentaiVariables>(
		getPreviews,
		{
			keyword:
				process.env.NODE_ENV === 'development'
					? 'yuri'
					: randomPick(tags),
			page: 1
		}
	).toPromise()

	return {
		props: {
			stories: stories.data?.searchHentai.data ?? []
		}
	}
}

export default Discover
