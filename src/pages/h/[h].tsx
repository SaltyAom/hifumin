import {
	Fragment,
	useEffect,
	useCallback,
	useRef,
	useReducer,
	useState,
	FunctionComponent
} from "react"

import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import dynamic from "next/dynamic"

import { Cover, Page } from "@components"

import fetch from "@libs/fetch"

import { Story } from "@types"

import "@styles/h.styl"

const Book = dynamic(() => import("@components/book"))

interface Props {
	story: string
	related: string
}

type Component = FunctionComponent<Props>

const Code: Component = ({ story: storyJson, related: relatedJson }) => {
	let [allowPage, increaseAllowPage] = useReducer(
			(allowPage) => allowPage + 20,
			20
		),
		[totalPage, updateTotalPage] = useState(20)

	let previousLazyLoad = useRef<() => void>()

	useEffect(() => {
		if (previousLazyLoad.current)
			document.removeEventListener("scroll", previousLazyLoad.current)

		if (allowPage < totalPage)
			document.addEventListener("scroll", lazyLoad, {
				passive: true
			})

		previousLazyLoad.current = lazyLoad
	}, [allowPage, totalPage])

	useEffect(() => {
		if (typeof storyJson === "undefined") return

		let {
			id,
			images: { pages }
		} = JSON.parse(storyJson)

		if (id) updateTotalPage(pages.length)
	}, [storyJson])

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
	if (typeof storyJson === "undefined")
		return (
			<main id="h">
				<Cover preload />
				<section className="pages">
					{Array(20)
						.fill(0)
						.map(({ link }, index) => (
							<Page
								key={index}
								preload
								link={`preload-${link}`}
							/>
						))}
				</section>
				<h5 className="more">More like this</h5>
				<footer className="related">
					{Array(5)
						.fill(0)
						.map((_, index) => (
							<Book key={index} story={false} preload />
						))}
				</footer>
			</main>
		)

	let story: Story = JSON.parse(storyJson),
		related: Story[] = JSON.parse(relatedJson)

	// ? Not valid
	if (!story.id) return <main id="h">Not Found</main>

	let {
		images: { cover, pages }
	} = story

	return (
		<Fragment>
			<Head>
				<link rel="preload" as="image" href={cover.link} />
				<link rel="preload" as="image" href={pages[0].link} />
				{pages.map(({ link }, index) =>
					!index || index > 4 ? null : (
						<link key={link} rel="preconnect" href={link} />
					)
				)}
				{pages.map(({ link }, index) =>
					index < 5 || index > allowPage ? null : (
						<link key={link} rel="dns-prefetch" href={link} />
					)
				)}
			</Head>
			<main id="h">
				<Cover story={story} />
				<section className="pages">
					{pages.map(({ link }, index) =>
						index < allowPage ? (
							<Page
								key={link}
								link={link}
								alt={`Page ${index + 1}`}
							/>
						) : null
					)}
				</section>
				<h5 className="more">More like this</h5>
				<footer className="related">
					{related.map((story) => (
						<Book key={story.id} story={story} />
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
		story = JSON.stringify(await fetch(`https://nhapi.now.sh/${h}`))
	} catch (err) {
		story = JSON.stringify({ id: "0" })
	}

	try {
		let data = await fetch(`https://nhapi.now.sh/${h}/related`)

		related = JSON.stringify(Array.isArray(data) ? data : [data])
	} catch (err) {
		related = JSON.stringify([])
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
