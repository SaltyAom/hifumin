import { Fragment, useEffect, FunctionComponent } from 'react'

import dynamic from 'next/dynamic'

import { useStoreon } from 'storeon/react'
import { SearchStore, SearchEvent, SettingStore, SettingEvent } from '@stores'

import { GetStaticProps } from 'next'

import { MasonryLayoutDeterminer } from '@providers'

import {
	PreloadGallery,
	RecommendedGallery,
	Search,
	OpenGraph
} from '@components'

import { fetch, filterTag, isNhentai, randomPick, tags } from '@libs'

import { Stories } from '@types'

import '@styles/landing.styl'

const SearchGallery = dynamic(() => import('@components/gallery/search')),
	LandingCover = dynamic(() => import('@components/landingCover'))

interface Props {
	stories: Stories
}

const Index: FunctionComponent<Props> = ({ stories }) => {
	let { search, dispatch } = useStoreon<SearchStore, SearchEvent>('search')
	let { useDefaultFilter, filter } = useStoreon<SettingStore, SettingEvent>(
		'filter'
	)

	// ? Pass down an initial story from Incremental Static Regeneration.
	let initialStories: Stories = useDefaultFilter
		? filterTag(stories, filter)
		: stories

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

	if (!initialStories.length)
		return (
			<Fragment>
				<OpenGraph
					title="Opener Studio"
					description="Pinterest but for hentai and 6 digit code."
				/>
				<MasonryLayoutDeterminer />
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
					<RecommendedGallery initial={initialStories} />
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
