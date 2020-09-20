import {
	useEffect,
	useReducer,
	useState,
	useRef,
	useCallback,
	useMemo,
	FunctionComponent
} from 'react'

import { GetStaticProps } from 'next'

import { Book } from '@components'

import { fetch, randomBetween, splitChunk, useMasonry } from '@libs'

import { Stories } from '@types'

import '@styles/landing.styl'

interface Props {
	stories: string
}

const Index: FunctionComponent<Props> = ({ stories }) => {
	let [galleries, updateGalleries] = useState<Stories>(JSON.parse(stories)),
		[page, nextPage] = useReducer((state) => state + 1, 1)

	let persistedListener = useRef<() => void>(),
		isLoading = useRef(false)

	let masonry = useMasonry()

	let lazyListener = useCallback(() => {
		if (isLoading.current) return

		if (document.body.scrollHeight - window.innerHeight * 3 >= pageYOffset)
			return

		nextPage()
	}, [nextPage])

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

	useEffect(() => {
		if (!isLoading.current)
			fetch(`https://nhapi.now.sh/search/page/${page}`).then(
				(newGalleries: Stories) => {
					isLoading.current = false

					updateGalleries([...galleries, ...newGalleries])
				}
			)

		let stopListener = () =>
			window.removeEventListener('scroll', persistedListener.current)

		if (persistedListener.current) stopListener()

		window.addEventListener('scroll', lazyListener, {
			passive: true
		})

		return () => stopListener()
	}, [page])

	if (!galleries.length)
		return (
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
		)

	return (
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
