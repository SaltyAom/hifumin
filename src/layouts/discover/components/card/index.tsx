import Link from 'next/link'

import { useAtom } from 'jotai'

import { BookOpen, Heart } from 'react-feather'

import tw, { combine } from '@tailwind'

import { useLazyLoad, useRefState, useBlurImage } from '@services/hooks'
import { SafeMode, safeModeAtom } from '@stores/settings'
import { imageEffect } from '@services/image-effect'

import { DiscoverCardComponent } from './types'

import styles from './card.module.sass'

const twClass = {
	detail: tw`flex flex-row items-center text-lg text-white font-normal no-underline m-0 capitalize`,
	icon: tw`w-[18px] h-[18px] mr-2`,
	imageIcon: tw`w-[21px] h-[21px] mr-2`
}

const DiscoverCard: DiscoverCardComponent = ({
	story: {
		id,
		title: { display },
		images: {
			cover,
			cover: {
				link,
				info: { width, height }
			}
		},
		metadata: { language },
		info: { amount, favorite }
	}
}) => {
	let [safeMode] = useAtom(safeModeAtom)

	let [lazyElement, shouldLoad] = useLazyLoad<HTMLAnchorElement>()
	let [target, targetRef] = useRefState<HTMLCanvasElement>()
	useBlurImage({
		page: cover,
		target,
		shouldBlur: safeMode === SafeMode.blur
	})

	return (
		<Link href="/h/[id]" as={`/h/${id}`}>
			<a
				role="article"
				className={tw`relative flex mb-4 bg-gray-100 dark:bg-gray-700 break-all rounded-lg overflow-hidden`}
				style={{
					paddingTop: (height / width) * 100 + '%'
				}}
				ref={lazyElement}
			>
				{shouldLoad &&
					(safeMode === SafeMode.blur ? (
						<canvas
							className={combine(
								imageEffect[safeMode],
								tw`absolute top-0 z-10 !w-full !h-full rounded-lg max-w-full m-0`
							)}
							ref={targetRef}
						/>
					) : (
						<img
							className={combine(
								imageEffect[safeMode],
								tw`absolute top-0 z-10 w-full rounded-lg max-w-full m-0 object-fit object-center`
							)}
							alt={display}
							src={link}
						/>
					))}
				<header
					className={combine(
						styles.card,
						tw`absolute z-10 top-0 left-0 flex flex-col justify-end w-full h-full p-3 rounded-lg opacity-0 hover:opacity-100 transition-opacity`
					)}
				>
					<h4
						className={tw`no-underline text-xl m-0 mt-2 font-medium text-white mb-2`}
					>
						{display}
					</h4>
					<h5 className={twClass.detail}>
						<img
							className={twClass.imageIcon}
							src="/icons/language.svg"
							alt="Language"
							aria-label="Language "
						/>
						{language}
					</h5>
					<section className={tw`flex flex-row items-center mt-1`}>
						<h6 className={combine(twClass.detail, tw`mr-4`)}>
							<BookOpen className={twClass.icon} />
							{amount}
						</h6>
						<h6 className={twClass.detail}>
							<Heart className={twClass.icon} />
							{favorite}
						</h6>
					</section>
				</header>
			</a>
		</Link>
	)
}

export default DiscoverCard
