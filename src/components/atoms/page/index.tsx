import { useAtom } from 'jotai'
import { safeModeAtom } from '@stores/settings'

import tw, { combine } from '@tailwind'

import { useLazyLoad } from '@services/hooks'
import { imageEffect } from '@services/image-effect'

import type { PageComponent } from './types'

export const Page: PageComponent = ({
	className = '',
	lazyLoad = true,
	page: {
		link,
		info: { width, height }
	}
}) => {
	let [safeMode] = useAtom(safeModeAtom)

	let [element, shouldLoad] = useLazyLoad()

	return (
		<figure
			className={combine(
				className,
				tw`relative w-full m-0 bg-gray-100 overflow-hidden rounded`
			)}
			style={{
				paddingTop: (height / width) * 100 + '%'
			}}
			ref={element}
		>
			<img
				className={combine(
					imageEffect[safeMode],
					tw`absolute top-0 w-full rounded`
				)}
				src={shouldLoad || !lazyLoad ? link : ''}
			/>
		</figure>
	)
}
