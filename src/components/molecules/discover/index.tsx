import { useMemo } from 'react'

import { useAtom } from 'jotai'
import { preferenceAtom } from '@stores/settings'

import { DiscoverCard } from '@layouts/discover'
import StoryError from '@atoms/story-error'

import tw from '@tailwind'

import { useHentaiCollection, usePageEndObserver } from '@services/hooks'
import { splitChunk } from '@services/array'

import type { DiscoverComponents } from '@types'

const DiscoverResults: DiscoverComponents = ({
	initial = [],
	spaces,
	error = null
}) => {
	let { stories, fetchMore, isEnd } = useHentaiCollection(initial)
	let [{ useDefaultFilter, filterList }] = useAtom(preferenceAtom)

	let storyGroups = useMemo(
		() =>
			splitChunk(
				stories.filter((story) => {
					let filters = useDefaultFilter ? [] : filterList

					return !story.metadata.tags.some(({ name: tag }) =>
						filters.includes(tag)
					)
				}),
				spaces
			),
		[stories, spaces, useDefaultFilter, filterList]
	)

	usePageEndObserver(fetchMore, isEnd)

	if (error) return <StoryError error={error?.message || ''} />

	return (
		<>
			{storyGroups.map((group, index) => (
				<section
					key={index.toString()}
					className={tw`flex flex-col flex-1 px-2`}
				>
					{group.map((story) => (
						<DiscoverCard key={story.id} story={story} />
					))}
				</section>
			))}
		</>
	)
}

export default DiscoverResults
