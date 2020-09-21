import { Fragment, useEffect, FunctionComponent } from 'react'

import dynamic from 'next/dynamic'

import { useStoreon } from 'storeon/react'
import { SearchStore, SearchEvent } from '@stores'

import { GetStaticProps } from 'next'
import Head from 'next/head'

import {
	MasonryLayoutDeterminer,
	PreloadGallery,
	RecommendedGallery,
	Search
} from '@components'

import { fetch, isNhentai } from '@libs'

import { Stories } from '@types'

import '@styles/landing.styl'

const SearchGallery = dynamic(() => import('@components/gallery/search')),
	LandingCover = dynamic(() => import('@components/landingCover'))

interface Props {
	stories: string
}

const Index: FunctionComponent<Props> = ({ stories }) => {
	// ? Pass down an initial story from Incremental Static Regeneration.
	let initialStories: Stories = JSON.parse(stories)

	let { search } = useStoreon<SearchStore, SearchEvent>('search')

	useEffect(() => {
		window.scrollTo({
			top: 0
		})
	}, [])

	if (!initialStories.length)
		return (
			<Fragment>
				<Head>
					<title>Opener Studio</title>
				</Head>
				<MasonryLayoutDeterminer />
				<PreloadGallery />
			</Fragment>
		)

	return (
		<Fragment>
			<Head>
				<title>Opener Studio</title>
			</Head>
			<MasonryLayoutDeterminer />
			<Search />
			{search ? (
				isNhentai(search) ? (
					<LandingCover />
				) : (
					<SearchGallery />
				)
			) : (
				<RecommendedGallery initial={initialStories} />
			)}
		</Fragment>
	)
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	let stories = JSON.stringify(
		await fetch('https://nhapi.now.sh/search/page/1')
	)

	return {
		props: {
			stories
		},
		revalidate: 3600
	}
}

export default Index
