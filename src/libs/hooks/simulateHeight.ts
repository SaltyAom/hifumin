import { useState, useReducer, useRef, useCallback, useEffect, MutableRefObject } from 'react'

type UseSimulateHeight = (argument: {
	width: number
	height: number
	preload: boolean
	shouldLoad?: boolean
}) => [number | 'unset', {
    element: MutableRefObject<HTMLImageElement>
    stopSimulateImageHeight: () => void
}]

const useSimulateHeight: UseSimulateHeight = ({ width, height, preload, shouldLoad = false }) => {
	let [imageHeight, updateHeight] = useState(0)

	let [isImageLoaded, imageLoaded] = useReducer(() => true, false)

	let element = useRef<HTMLImageElement>(),
		resizeListener = useRef<() => void>()

	let calculateImageHeight = useCallback(
		() =>
			(typeof element.current === 'undefined'
				? 0
				: element.current.clientWidth / width) * height,
		[element.current?.clientWidth, width, height]
	)

	let simulateImageHeight = useCallback(() => {
			updateHeight(calculateImageHeight())
		}, []),
		stopSimulateImageHeight = useCallback(() => {
			imageLoaded()
			window.removeEventListener('resize', resizeListener.current)
		}, [])

	useEffect(() => {
		if (preload) return

		updateHeight(calculateImageHeight())

		if (!shouldLoad) return

		window.addEventListener('resize', simulateImageHeight)

		resizeListener.current = simulateImageHeight
	}, [preload])

	return [
		!isImageLoaded ? imageHeight : 'unset',
		{
			element,
			stopSimulateImageHeight
		}
	]
}

export default useSimulateHeight
