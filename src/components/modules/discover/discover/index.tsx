import { useMemo } from 'react'

import { DiscoverCard } from '@layouts/discover'

import tw from '@tailwind'

import { useHentaiCollection, usePageEndObserver } from '@services/hooks'
import { splitChunk } from '@services/array'

import type { DiscoverComponents } from '../types'

export const DiscoverResults: DiscoverComponents = ({ initial, spaces }) => {
	let { stories, fetchMore, isEnd } = useHentaiCollection(initial)

	let storyGroups = useMemo(
		() => splitChunk(stories, spaces),
		[stories, spaces]
	)

	usePageEndObserver(fetchMore, isEnd)

	return (
		<>
			{storyGroups.map((group, index) => (
				<section key={index} className={tw`flex flex-col flex-1 px-2`}>
					{group.map((story) => (
						<DiscoverCard key={story.id} story={story} />
					))}
				</section>
			))}
		</>
	)
}
