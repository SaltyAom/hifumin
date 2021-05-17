import {
	RefObject,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'

import { isServer } from '@services/validation'

interface Dimension {
	width: number
	height: number
}

export const useScale = <T extends HTMLElement = HTMLElement>({
	width,
	height
}: Dimension): [RefObject<T>, Dimension] => {
	let [dimension, updateDimension] = useState<Dimension>({
		width,
		height
	})
	let element = useRef<T>(null)

	useEffect(() => {
		scale()

		window.addEventListener('resize', scale, {
			passive: true
		})

		return () => {
			window.removeEventListener('resize', scale)
		}
	}, [width, height, element.current])

	let globalWidth = !isServer ? window.innerWidth : 0
	let globalHeight = !isServer ? window.innerHeight : 0

	let scale = useMemo(
		() => () => {
			let expectedWidth = element.current?.clientWidth

			if (!expectedWidth) return

			let ratio = width / expectedWidth

			let expectedHeight = height / ratio

			updateDimension({
				width: expectedWidth,
				height: expectedHeight
			})
		},
		[width, height, globalWidth, globalHeight]
	)

	return [element, dimension]
}
