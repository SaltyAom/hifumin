import {
	Fragment,
	useEffect,
	useCallback,
	useRef,
	useReducer,
	useState,
	FunctionComponent
} from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import { Cover, Page, OpenGraph } from '@components'
import NotFound from '@components/gallery/search/notFound'

import { fetch } from '@libs/fetch'

import { Story } from '@types'

import '@styles/h.styl'

const Book = dynamic(() => import('@components/book'))

interface Props {
	story: Story
	related: Story[]
}

type Component = FunctionComponent<Props>

const Code: Component = ({ story, related }) => {
	let [allowPage, increaseAllowPage] = useReducer(
			(allowPage) => allowPage + 20,
			20
		),
		[totalPage, updateTotalPage] = useState(20)

	let previousLazyLoad = useRef<() => void>()

	useEffect(() => {
		if (previousLazyLoad.current)
			document.removeEventListener('scroll', previousLazyLoad.current)

		if (allowPage < totalPage)
			document.addEventListener('scroll', lazyLoad, {
				passive: true
			})

		previousLazyLoad.current = lazyLoad
	}, [allowPage, totalPage])

	useEffect(() => {
		if (typeof story === 'undefined' || !story.id) return

		let {
			id,
			images: { pages }
		} = story

		if (id) updateTotalPage(pages.length)
	}, [story])

	let lazyLoad = useCallback(() => {
		let pageHeight = window.innerHeight

		if (
			totalPage <= allowPage ||
			document.body.scrollHeight >= window.pageYOffset + pageHeight * 2.5
		)
			return

		increaseAllowPage()
	}, [allowPage, increaseAllowPage, totalPage])

	// ? Generating
	if (typeof story === 'undefined')
		return (
			<Fragment>
				<OpenGraph
					title="Opener Studio"
					description="Pinterest but for hentai and 6 digit code."
				/>
				<Head>
					<title>Loading...</title>
				</Head>
				<main id="h">
					<Cover preload />
					<section className="pages">
						{Array(20)
							.fill(0)
							.map((_, index) => (
								<Page key={index} preload />
							))}
					</section>
					<h5 className="more">More like this</h5>
					<footer className="related">
						{Array(5)
							.fill(0)
							.map((_, index) => (
								<Book key={index} preload />
							))}
					</footer>
				</main>
			</Fragment>
		)

	// ? Not valid
	if (!story.id)
		return (
			<main id="h">
				<OpenGraph
					title="Opener Studio"
					description="Pinterest but for hentai and 6 digit code."
				/>
				<Head>
					<title>Not Found</title>
				</Head>
				<NotFound />
			</main>
		)

	let {
		id,
		images: { cover, pages },
		title: { display, english, japanese },
		info: { favorite, amount, upload },
		metadata: { language, artist, tags }
	} = story

	let description = `${english} / ${japanese} Language: ${language}, ${amount} page, ${favorite} favorite. Tags: ${tags
		.map((tag) => tag.name)
		.join(', ')}`

	let date = new Date(+`${upload.original}000`),
		year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date),
		month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date),
		day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)

	let structuredData = JSON.stringify({
		'@context': 'https://schema.org/',
		'@type': 'Book',
		description: description,
		headline: display,
		image: [cover.link],
		bookEdition: '1',
		bookFormat: 'GraphicNovel',
		illustrator: artist.name,
		numberOfPages: pages.length,
		inLanguage: language,
		mainEntityOfPage: `https://opener.studio/h/${id}`,
		url: `https://opener.studio/h/${id}`,
		datePublished: `${month} ${day}, ${year}`
	}).replace(/\n|\t|  /g, '')

	return (
		<Fragment>
			<Head>
				<link rel="preload" as="image" href={cover.link} />
				<link rel="preload" as="image" href={pages[0].link} />
				{pages.map(({ link }, index) =>
					!index || index > 4 ? null : (
						<link key={index} rel="preconnect" href={link} />
					)
				)}
				{pages.map(({ link }, index) =>
					index < 5 || index > allowPage ? null : (
						<link key={index} rel="dns-prefetch" href={link} />
					)
				)}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: structuredData
					}}
				/>
			</Head>
			<OpenGraph
				title={display}
				alternativeTitle={[english, japanese]}
				description={description}
				author={artist.name}
				image={cover}
				id={id}
			/>
			<Head>
				<meta property="og:type" content="book" />
				<meta property="book:author" content={artist.name} />
				<meta
					property="book:tag"
					content={tags.map((tag) => tag.name).join(', ')}
				/>
			</Head>
			<main id="h">
				<Cover story={story} />
				<section className="pages">
					{pages.map((page, index) => (
						<Page
							key={index}
							page={page}
							alt={`Page ${index + 1}`}
						/>
					))}
				</section>
				<h5 className="more">More like this</h5>
				<footer className="related">
					{related.map((story, index) => (
						<Book key={index} story={story} />
					))}
				</footer>
			</main>
		</Fragment>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: true
	}
}

export const getStaticProps: GetStaticProps<Props> = async ({
	params: { h }
}) => {
	let story, related

	try {
		story = await fetch(`https://nhapi.now.sh/${h}`)
	} catch (err) {
		story = { id: 0 }
	}

	try {
		let data = await fetch(`https://nhapi.now.sh/${h}/related`)

		related = Array.isArray(data) ? data : [data]
	} catch (err) {
		related = []
	}

	return {
		props: {
			story,
			related
		},
		revalidate: 3600
	}
}

export default Code
