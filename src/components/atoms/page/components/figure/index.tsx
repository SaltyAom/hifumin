import { CompressionType } from '@stores/settings'

import tw, { combine } from '@tailwind'

import { useCompressionType, useLazyLoad } from '@services/hooks'

import type { FigureComponent } from './types'

import styles from './figure.module.sass'

export const Figure: FigureComponent = ({
	children,
	className = '',
	lazyLoad = true,
	page: {
		info: { width, height }
	}
}) => {
	let [element, shouldLoad] = useLazyLoad()

	let compression = useCompressionType()
	let isNative = compression === CompressionType.native

	return (
		<figure
			className={combine(
				className,
				!isNative ? styles['next-image'] : '',
				tw`relative w-full m-0 bg-gray-100 overflow-hidden rounded`
			)}
			style={{
				paddingTop:
					isNative || !shouldLoad ? (height / width) * 100 + '%' : 0
			}}
			ref={element}
		>
			{shouldLoad || !lazyLoad ? children : null}
		</figure>
	)
}
