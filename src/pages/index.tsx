import { Fragment, useEffect, useMemo, FunctionComponent } from 'react'

import { GetStaticProps } from 'next'
import Head from 'next/head'

import { Book } from '@components'

import { fetch, randomBetween, splitChunk } from '@libs'
import { useInfiniteHentai, useMasonry } from '@libs/hooks'

import '@styles/landing.styl'

interface Props {
	stories: string
}

const Index: FunctionComponent<Props> = ({ stories }) => {
	let [galleries] = useInfiniteHentai(JSON.parse(stories))

	let masonry = useMasonry()

	let margin = useMemo(() => {
		if (masonry === 2) return [40, 120]

		let margin = Array(masonry).fill(0)

		return margin.map(() => randomBetween(0, 160) + 'px')
	}, [masonry])

	useEffect(() => {
		window.scrollTo({
			top: 0
		})
	}, [])

	if (!galleries.length)
		return (
			<Fragment>
				<Head>
					<title>Opener Studio</title>
				</Head>
				<main id="gallery">
					{splitChunk(Array(25).fill(0), masonry).map((column, index) => (
						<div
						key={index}
						className="masonry"
						style={{ marginTop: margin[index] }}
						>
							{column.map((_, index) => (
								<Book key={index} preload />
								))}
							<Book preload />
							<Book preload />
						</div>
					))}
				</main>
			</Fragment>
		)

	return (
		<Fragment>
			<Head>
				<title>Opener Studio</title>
			</Head>
			<main id="gallery">
				{splitChunk(galleries, masonry).map((column, index) => (
					<div
					key={index}
					className="masonry"
					style={{ marginTop: margin[index] }}
					>
						{column.map((story, index) => (
							<Book key={index} story={story} />
							))}
						<Book preload />
						<Book preload />
					</div>
				))}
			</main>
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
