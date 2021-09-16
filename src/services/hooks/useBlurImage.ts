/* eslint-disable no-undef */
import { useEffect } from 'react'

import type StackBlur from 'stackblur-canvas'

import { Page } from '@types'

interface UseBlurImageProps {
	shouldBlur: boolean
	page: Page
	target: HTMLCanvasElement | null
	onError: GlobalEventHandlers['onerror']
}

// eslint-disable-next-line no-unused-vars
type UseBlurImage = (input: UseBlurImageProps) => void

const useBlurImage: UseBlurImage = ({ page, shouldBlur, target, onError }) => {
	useEffect(() => {
		if (!shouldBlur || !target || !page) return

		let {
			link,
			info: { width, height }
		} = page

		let main = async () => {
			let image = new Image()
			image.width = width
			image.height = height

			image.src = `/_next/image?url=${encodeURI(link)}&w=568&q=1`
			image.onerror = onError

			const [stackBlur]: [typeof StackBlur, void] = await Promise.all([
				// eslint-disable-next-line global-require
				require('stackblur-canvas'),
				new Promise<void>((resolve) => {
					image.addEventListener(
						'load',
						() => {
							resolve()
						},
						{
							passive: true
						}
					)
				})
			])

			stackBlur.image(image, target, 128, true)
		}

		main()
	}, [page, shouldBlur, target])
}

export default useBlurImage
