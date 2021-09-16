import { useMemo, useEffect, useState } from 'react'

import { useAtom } from 'jotai'
import { persistedDiscoveredAtom } from '@stores/discover'
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
import { randomBetween } from '@services/random'

import type { DiscoverComponents } from '@types'

const DiscoverResults: DiscoverComponents = ({
	// initial = [],
	spaces,
	error = null,
	layoutRef
}) => {
	let [persistedStories, updatePersistedStories] = useAtom(
		persistedDiscoveredAtom
	)

	let { stories, fetchMore, isEnd, isLoading } = useHentaiCollection(
		persistedStories,
		error
	)

	useEffect(() => {
		if (!persistedStories.length) updatePersistedStories(stories)
	}, [stories, persistedStories])

	let [{ useDefaultFilter, filterList }] = useAtom(preferenceAtom)
	let [windowSize] = useWindowSize()

	let [gaps, updateGap] = useState(
		Array(spaces)
			.fill(0)
			.map(() => randomBetween(0, 180))
	)

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

	usePageEndObserver(fetchMore, (isLoading && !stories.length) || isEnd)

	useEffect(() => {
		let layout = layoutRef.current

		if (!layout) return

		if (layout.clientHeight < window.innerHeight && !isLoading) fetchMore()
	}, [layoutRef, fetchMore, isLoading, windowSize])

	useEffect(() => {
		updateGap(
			Array(spaces)
				.fill(0)
				.map(() => randomBetween(0, 120))
		)
	}, [spaces])

	if (isLoading && !stories.length)
		return (
			<>
				{storyGroups.map((_, i) => (
					<section className={tw`flex flex-col flex-1 gap-4`}>
						<section
							style={{
								height: gaps[i]
							}}
						/>
						{Array(8)
							.fill(0)
							.map((__, index) => (
								// eslint-disable-next-line jsx-a11y/anchor-has-content
								<a
									key={index.toString()}
									className={tw`w-full block bg-gray-100 dark:bg-gray-700 rounded-lg`}
									style={{
										height: Math.random() * 120 + 240
									}}
									aria-label="Loading"
								/>
							))}
					</section>
				))}
			</>
		)

	if (error) return <StoryError error={error?.message || ''} />

	return (
		<>
			{storyGroups.map((group, index) => (
				<section
					key={index.toString()}
					className={tw`flex flex-col flex-1 gap-4`}
				>
					<section
						style={{
							height: gaps[index]
						}}
					/>
					{group.map((story) => (
						<DiscoverCard key={story.id} story={story} />
					))}
				</section>
			))}
		</>
	)
}

export default DiscoverResults
