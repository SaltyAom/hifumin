import {
	memo,
	useEffect,
	useReducer,
	useRef
} from 'react'

import { PageComponent, PageProps } from './types'

import './page.styl'
import useSimulateHeight from '@libs/hooks/simulateHeight'

const shouldReRender = (prevProps: PageProps, nextProps: PageProps) =>
	prevProps?.page?.link === nextProps?.page?.link

const Page: PageComponent = memo(
	({
		page: { link, info: { width, height } } = {
			link: '',
			info: { width: 0, height: 0 }
		},
		alt = '',
		preload = false,
		children = null
	}) => {
		let [shouldLoad, load] = useReducer(() => true, false)

		let [
			simulatedImageHeight,
			{ element, stopSimulateImageHeight }
		] = useSimulateHeight({
			width,
			height,
			preload,
			shouldLoad
		})

		let persistObserver = useRef<IntersectionObserver>()

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
			observer.observe(element.current)

			persistObserver.current = observer
		}, [shouldLoad])

		if (preload)
			return (
				<div className="page">
					{children}
					<img
						className={`paper -lazy -preload`}
						ref={element}
						alt={alt}
					/>
				</div>
			)

		return (
			<div className="page">
				{children}
				<img
					className={`paper ${!shouldLoad ? '-lazy' : ''}`}
					ref={element}
					src={shouldLoad ? link : ''}
					alt={alt}
					loading="lazy"
					style={{ height: simulatedImageHeight }}
					onLoad={stopSimulateImageHeight}
				/>
			</div>
		)
	},
	shouldReRender
)

export default Page
