import {
	Fragment,
	useEffect,
	useCallback,
	useRef,
	useReducer,
	useState,
	FunctionComponent
} from 'react'

import { GetStaticProps } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import { Cover, Page, OpenGraph } from '@components'

import { Stories, Story } from '@types'

import styles from '@styles/h.module.sass'

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
	)
	let [totalPage, updateTotalPage] = useState(20)

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
		if (typeof story === 'undefined') return

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
				<Head>
					<title>Loading...</title>
				</Head>
				<OpenGraph
					title="Opener Studio"
					description="Pinterest but for hentai and 6 digit code."
				/>
				<main id={styles['h']}>
					<Cover preload />
					<section className={styles.pages}>
						{Array(20)
							.fill(0)
							.map((_, index) => (
								<Page key={index} preload />
							))}
					</section>
					<h5 className={styles.more}>More like this</h5>
					<footer className={styles.related}>
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
	if (!story.id) return <main id={styles['h']}>Not Found</main>

	let {
		images: { cover, pages },
		title: { display },
		info: { favorite, amount },
		metadata: { language }
	} = story

	return (
		<Fragment>
			<Head>
				<title>{display}</title>
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
			</Head>
			<OpenGraph
				title={display}
				description={`${language}, ${amount} page, ${favorite} favorite.`}
				image={cover}
			/>
			<main id={styles['h']}>
				<Cover story={story} />
				<section className={styles.pages}>
					{pages.map((page, index) =>
						index < allowPage ? (
							<Page
								key={index}
								page={page}
								alt={`Page ${index + 1}`}
							/>
						) : null
					)}
				</section>
				<h5 className={styles.more}>More like this</h5>
				<footer className={styles.related}>
					{related.map((story, index) => (
						<Book key={index} story={story} />
					))}
				</footer>
			</main>
		</Fragment>
	)
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	let story: Story = {
		id: 229345,
		title: {
			display: 'ปุ๊บปั๊บมองแรงใส่คุณ',
			english: 'ปุ๊บปั๊บมองแรงใส่คุณ',
			japanese: 'ปุ๊บปั๊บมองแรงใส่คุณ'
		},
		images: {
			pages: [
				{
					link: 'https://opener.studio/images/pub/cover.jpg',
					info: {
						type: 'jpg',
						width: 350,
						height: 506
					}
				},
				{
					link: 'https://opener.studio/images/pub/pub.jpg',
					info: {
						type: 'jpg',
						width: 573,
						height: 572
					}
				}
			],
			cover: {
				link: 'https://opener.studio/images/pub/cover.jpg',
				info: {
					type: 'jpg',
					width: 350,
					height: 506
				}
			}
		},
		info: {
			amount: 2,
			favorite: 42069,
			upload: {
				original: 1602043927,
				parsed: '10/7/2020'
			}
		},
		metadata: {
			artist: {
				name: 'ปุ๊บปั๊บ',
				count: 1,
				url: 'https://opener.studio'
			},
			tags: [
				{
					name: 'Happy',
					count: 1,
					url: 'https://opener.studio'
				},
				{
					name: 'Birthday',
					count: 1,
					url: 'https://opener.studio'
				},
				{
					name: 'Wholesome',
					count: 1,
					url: 'https://opener.studio'
				}
			],
			language: 'Thai'
		}
	}

	let related: Stories = []

	return {
		props: {
			story,
			related
		}
	}
}

export default Code
