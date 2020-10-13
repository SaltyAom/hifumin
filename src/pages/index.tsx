import { Fragment, useEffect, useState, FunctionComponent } from 'react'

import dynamic from 'next/dynamic'

import { useStoreon } from 'storeon/react'
import { SearchStore, SearchEvent, SettingStore, SettingEvent } from '@stores'

import { GetStaticProps } from 'next'

import { MasonryLayoutDeterminer } from '@providers'

import {
	PreloadGallery,
	RecommendedGallery,
	Search,
	OpenGraph,
	Input
} from '@components'

import { fetch, isNhentai, randomPick, tags, filterTag } from '@libs'

import { Stories } from '@types'

import '@styles/landing.styl'

const SearchGallery = dynamic(() => import('@components/gallery/search')),
	LandingCover = dynamic(() => import('@components/landingCover'))

interface Props {
	stories: Stories
}

const Index: FunctionComponent<Props> = ({ stories }) => {
	let { search, dispatch } = useStoreon<SearchStore, SearchEvent>('search')
	let { filter, useDefaultFilter } = useStoreon<SettingStore, SettingEvent>(
		'filter',
		'useDefaultFilter'
	)

	let [initialStories, updateInitialStories] = useState(stories)

	useEffect(() => {
		window.scrollTo({
			top: 0
		})

		return () => {
			dispatch('UPDATE_SEARCH', '')
			dispatch('UPDATE_IS_LOADING', false)
			dispatch('UPDATE_IS_ERROR', false)
		}
	}, [])

	useEffect(() => {
		if (useDefaultFilter) return

		updateInitialStories(filterTag(stories, filter))
	}, [stories, filter, useDefaultFilter])

	if (!stories.length)
		return (
			<Fragment>
				<OpenGraph
					title="Opener Studio"
					description="Pinterest but for hentai and 6 digit code."
				/>
				<MasonryLayoutDeterminer />
				<Search />
				<main id="gallery">
					<PreloadGallery />
				</main>
			</Fragment>
		)

	return (
		<Fragment>
			<OpenGraph
				title="Opener Studio"
				description="Pinterest but for hentai and 6 digit code."
			/>
			<MasonryLayoutDeterminer />
			<Search />
			<main id="gallery">
				{search ? (
					isNhentai(search) ? (
						<LandingCover />
					) : (
						<SearchGallery />
					)
				) : (
					<RecommendedGallery
						initial={filterTag(initialStories, filter)}
					/>
				)}
			</main>
		</Fragment>
	)
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	let stories = await fetch(
		`https://nhapi.now.sh/search/${randomPick(tags)}/1`
	)

	return {
		props: {
			stories
		},
		revalidate: 3600
	}
}

export default Index
