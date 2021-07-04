import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/router'

import { useAtom } from 'jotai'
import { searchAtom } from '@stores/search'

import { DiscoverCard } from '@layouts/discover'

import tw, { combine } from '@tailwind'

import { ProgressIndicator } from '@components/atoms'

import { usePageEndObserver, useSearchHentai } from '@services/hooks'
import { splitChunk } from '@services/array'

import type { DiscoverComponents } from '../types'

import styles from './search-results.module.sass'

export const SearchResults: DiscoverComponents = ({ initial = [], spaces }) => {
	let [keyword] = useAtom(searchAtom)

	let {
		stories,
		fetchMore,
		isLoading: isSearching,
		isEnd
	} = useSearchHentai(keyword)

	let [pageLoaded, updatePageState] = useState(false)

	let storyGroups = useMemo(
		() => splitChunk(initial.concat(stories), spaces),
		[stories, spaces, initial]
	)

	usePageEndObserver(fetchMore, isEnd)

	let { events } = useRouter()

	useEffect(() => {
		let changingRoute = () => {
			updatePageState(false)
		}

		let changedRoute = () => {
			updatePageState(true)
		}

		events.on('routeChangeStart', changingRoute)
		events.on('routeChangeComplete', changedRoute)

		return () => {
			events.off('routeChangeStart', changingRoute)
			events.off('routeChangeComplete', changingRoute)
		}
	}, [])

	if (!initial.length && keyword && !stories.length)
		if (isSearching || !pageLoaded)
			return (
				<section
					key="searching-layout"
					className={tw`flex flex-1 justify-center items-center pb-12`}
				>
					<ProgressIndicator />
				</section>
			)
		else
			return (
				<section
					key="search-not-found"
					className={tw`flex flex-1 flex-col justify-center items-center pb-12`}
				>
					<div
						className={combine(
							styles.shadow,
							tw`block w-full max-w-[480px] overflow-hidden rounded mb-6`
						)}
					>
						<div
							className={tw`block w-full aspect-w-16 aspect-h-9 bg-gray-200 rounded`}
						>
							<img
								className={tw`w-full object-cover object-center rounded`}
								src="/images/ame.jpg"
								alt="Not found"
							/>
						</div>
					</div>
					<h1
						className={tw`text-3xl font-medium text-gray-900 dark:text-gray-200 m-0 mb-3`}
					>
						Not Found
					</h1>
					<p className={tw`text-lg text-gray-500 m-0 mt-1`}>
						Maybe try another keyword?
					</p>
					<p className={tw`text-lg text-gray-500 m-0 mt-1`}>
						You can also use 6 digits code too.
					</p>
				</section>
			)

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
