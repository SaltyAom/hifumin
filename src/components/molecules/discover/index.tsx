import { useMemo, useEffect } from 'react'

import { useAtom } from 'jotai'
import { preferenceAtom } from '@stores/settings'

import { DiscoverCard } from '@layouts/discover'
import StoryError from '@atoms/story-error'

import tw from '@tailwind'

import {
	useHentaiCollection,
	usePageEndObserver,
	useWindowSize
} from '@services/hooks'
import { splitChunk } from '@services/array'

import type { DiscoverComponents } from '@types'

const DiscoverResults: DiscoverComponents = ({
	initial = [],
	spaces,
	error = null,
	layoutRef
}) => {
	let { stories, fetchMore, isEnd, isLoading } = useHentaiCollection(initial)
	let [{ useDefaultFilter, filterList }] = useAtom(preferenceAtom)
	let [windowSize] = useWindowSize()

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

	useEffect(() => {
		let layout = layoutRef.current

		if (!layout) return

		if (layout.clientHeight < window.innerHeight && !isLoading) fetchMore()
	}, [layoutRef, fetchMore, isLoading, windowSize])

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
