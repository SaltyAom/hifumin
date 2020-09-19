import { memo, useEffect, useReducer, useRef } from "react"

import { PageComponent, PageProps } from "./types"

import "./page.styl"

const shouldReRender = (prevProps: PageProps, nextProps: PageProps) =>
	prevProps.link === nextProps.link

const Page: PageComponent = memo(({ link = "", alt = "", preload = false }) => {
	let [shouldLoad, load] = useReducer(() => true, false)

	let page = useRef(),
		persistObserver = useRef<IntersectionObserver>()

	useEffect(() => {
		if (shouldLoad) return persistObserver.current.disconnect()

		let options = {
				root: null,
				rootMargin: `${window.innerHeight / 2.25}px`,
				threshold: 0
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
				<img className={`paper -lazy -preload`} ref={page} alt={alt} />
			</div>
		)

	return (
		<div className="page">
			<img
				className={`paper ${!shouldLoad ? "-lazy" : ""}`}
				ref={page}
				src={shouldLoad ? link : ""}
				alt={alt}
				loading="lazy"
			/>
		</div>
	)
}, shouldReRender)

export default Page
