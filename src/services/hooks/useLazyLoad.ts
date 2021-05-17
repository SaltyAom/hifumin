import { RefObject, useEffect, useReducer, useRef } from 'react'

export const useLazyLoad = <T extends HTMLElement = HTMLElement>(): [
	RefObject<T>,
	boolean
] => {
	let [isNear, toggle] = useReducer(() => true, false)
	let element = useRef<T>(null)

	useEffect(() => {
		let observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return

					toggle()
					observer.disconnect()
				})
			},
			{
				rootMargin: window.innerHeight * 0.5 + 'px'
			}
		)

		requestAnimationFrame(() => {
			if (element.current) observer.observe(element.current)
		})

		return () => {
			observer.disconnect()
		}
	}, [element.current])

	return [element, isNear]
}
