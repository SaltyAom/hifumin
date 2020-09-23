import { Fragment, useEffect, FunctionComponent } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'

import { useStoreon } from 'storeon/react'
import { SearchStore, SearchEvent } from '@stores'

import { GetStaticProps } from 'next'

import {
	MasonryLayoutDeterminer,
	PreloadGallery,
	RecommendedGallery,
	Search
} from '@components'

import { fetch, isNhentai, randomPick, tags } from '@libs'

import { Stories } from '@types'

import '@styles/landing.styl'
import OpenGraph from '@components/openGraph'

const SearchGallery = dynamic(() => import('@components/gallery/search')),
	LandingCover = dynamic(() => import('@components/landingCover'))

interface Props {
	stories: string
}

const Index: FunctionComponent<Props> = ({ stories }) => {
	// ? Pass down an initial story from Incremental Static Regeneration.
	let initialStories: Stories = JSON.parse(stories)

	let { search, dispatch } = useStoreon<SearchStore, SearchEvent>('search')

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
				<Head>
					<title>Opener Studio</title>
				</Head>
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
			<Head>
				<title>Opener Studio</title>
			</Head>
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
	let stories = JSON.stringify(
		await fetch(`https://nhapi.now.sh/search/${randomPick(tags)}/1`)
	)

	return {
		props: {
			stories
		},
		revalidate: 3600
	}
}

export default Index
