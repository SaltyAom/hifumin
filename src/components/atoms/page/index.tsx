import dynamic from 'next/dynamic'

import { useAtom } from 'jotai'
import { CompressionType, SafeMode, safeModeAtom } from '@stores/settings'

import tw, { combine } from '@tailwind'

import { useCompressionType, useRefState, useBlurImage } from '@services/hooks'
import { imageEffect } from '@services/image-effect'

import { Figure } from './components'

import type { PageComponent } from './types'

const Image = dynamic(() => import('next/image'))

const Page: PageComponent = (props) => {
	let {
		className = '',
		page,
		page: {
			link,
			info: { width, height }
		}
	} = props

	let [safeMode] = useAtom(safeModeAtom)
	let compression = useCompressionType()

	let [target, targetRef] = useRefState<HTMLCanvasElement>()
	useBlurImage({
		page,
		target,
		shouldBlur: safeMode === SafeMode.blur
	})

	let isCompact = compression === CompressionType.compact
	let isHeavy = compression === CompressionType.heavy

	let isBlur = safeMode === SafeMode.blur

	if (isBlur)
		return (
			<Figure {...props} isBlur>
				<canvas
					className={combine(
						imageEffect[safeMode],
						tw`absolute top-0 w-full h-full rounded`,
						className
					)}
					ref={targetRef}
				/>
			</Figure>
		)

	if (isCompact || isHeavy)
		return (
			<Figure {...props}>
				<Image
					className={className}
					quality={isCompact ? 85 : 60}
					src={link}
					width={width}
					height={height}
				/>
			</Figure>
		)

	return (
		<Figure {...props}>
			<img
				className={combine(
					imageEffect[safeMode],
					tw`absolute top-0 w-full rounded`,
					className
				)}
				src={link}
				alt="Page"
			/>
		</Figure>
	)
}

export default Page
