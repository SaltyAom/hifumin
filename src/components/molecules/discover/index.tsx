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
	let { stories, fetchMore, isEnd, isLoading } = useHentaiCollection(
		initial,
		error
	)
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

	usePageEndObserver(fetchMore, (isLoading && !stories.length) || isEnd)

	useEffect(() => {
		let layout = layoutRef.current

		if (!layout) return

		if (layout.clientHeight < window.innerHeight && !isLoading) fetchMore()
	}, [layoutRef, fetchMore, isLoading, windowSize])

	if (isLoading && !stories.length)
		return (
			<>
				{storyGroups.map(() => (
					<section className={tw`flex flex-col flex-1 gap-4`}>
						{Array(8)
							.fill(0)
							.map((_, index) => (
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
					{group.map((story) => (
						<DiscoverCard key={story.id} story={story} />
					))}
				</section>
			))}
		</>
	)
}

export default DiscoverResults
