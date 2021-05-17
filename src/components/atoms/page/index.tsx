import { useLazyLoad } from '@services/hooks'
import tw, { combine } from '@tailwind'

import type { PageComponent } from './types'

export const Page: PageComponent = ({
	className = '',
	lazyLoad = true,
	page: {
		link,
		info: { width, height }
	}
}) => {
	let [element, shouldLoad] = useLazyLoad()

	return (
		<figure
			className={combine(
				className,
				tw`relative w-full bg-gray-100 overflow-hidden rounded`
			)}
			style={{
				paddingTop: (height / width) * 100 + '%'
			}}
			ref={element}
		>
			<img
				className={tw`absolute top-0 w-full rounded`}
				src={shouldLoad || !lazyLoad ? link : ''}
			/>
		</figure>
	)
}
