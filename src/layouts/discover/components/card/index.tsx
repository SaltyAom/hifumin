import Link from 'next/link'

import tw, { combine } from '@tailwind'

import { useLazyLoad, useScale } from '@services/hooks'

import { DiscoverCardComponent } from './types'

import styles from './card.module.sass'
import utilities from '@styles/utilities.module.sass'

export const DiscoverCard: DiscoverCardComponent = ({
	story: {
		title: { display },
		images: {
			cover: {
				link,
				info: { width, height }
			}
		}
	}
}) => {
	let [lazyElement, shouldLoad] = useLazyLoad<HTMLImageElement>()

	return (
		<Link href="/">
			<a
				role="article"
				className={tw`relative flex mb-4 bg-gray-100 rounded-lg overflow-hidden`}
				style={{
					paddingTop: height / width * 100 + '%'
				}}
			>
				<img
					className={tw`absolute top-0 z-10 w-full rounded-lg max-w-full m-0 object-fit object-center`}
					src={shouldLoad ? link : undefined}
					ref={lazyElement}
				/>
				<header
					className={combine(
						styles.card,
						tw`absolute z-10 top-0 left-0 flex flex-col justify-end w-full h-full p-4 rounded-lg opacity-0 hover:opacity-100 transition-opacity`
					)}
				>
					<h4
						className={tw`no-underline text-lg m-0 mt-2 text-white`}
					>
						{display}
					</h4>
				</header>
			</a>
		</Link>
	)
}
