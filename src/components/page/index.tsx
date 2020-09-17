import { memo, useEffect, useReducer, useRef } from "react"

import { PageComponent, PageProps } from "./types"

import "./page.styl"

const shouldReRender = (prevProps: PageProps, nextProps: PageProps) =>
	prevProps.link === nextProps.link

const Page: PageComponent = memo(
	({ link = "", index = 0, preload = false }) => {
		let [shouldLoad, load] = useReducer(() => true, false)

		let page = useRef(),
			persistObserver = useRef<IntersectionObserver>()

		useEffect(() => {
			if (shouldLoad) return persistObserver.current.disconnect()

			let options = {
					root: null,
					rootMargin: `${window.innerHeight / 1.75}px`,
					threshold: 0,
				},
				callback = (result) => {
					let [{ isIntersecting }] = result

					if (isIntersecting) load()
				}

			let observer = new IntersectionObserver(callback, options)
			observer.observe(page.current)

			persistObserver.current = observer
		}, [shouldLoad])

		if (preload)
			return (
				<div className="page">
					<img
						className={`paper -lazy -preload`}
						ref={page}
						alt={`Page ${index + 1}`}
					/>
				</div>
			)

		return (
			<div className="page">
				<img
					className={`paper ${!shouldLoad ? "-lazy" : ""}`}
					ref={page}
					src={shouldLoad ? link : ""}
					alt={`Page ${index + 1}`}
				/>
			</div>
		)
	},
	shouldReRender
)

export default Page
