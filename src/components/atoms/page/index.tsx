import { useMemo, useState } from 'react'
import type { MouseEventHandler } from 'react'

import dynamic from 'next/dynamic'

import { useAtom } from 'jotai'
import { CompressionType, SafeMode, safeModeAtom } from '@stores/settings'

import tw, { combine } from '@tailwind'

import { useCompressionType, useRefState, useBlurImage } from '@services/hooks'
import { imageEffect } from '@services/image-effect'

import { RotateCw } from 'react-feather'

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

	let [slug, updateSlug] = useState('')
	let [isError, updateError] = useState(false)

	let displayError = () => {
		updateError(true)
	}

	let reloadImage: MouseEventHandler<HTMLButtonElement> = () => {
		if (!isError) return

		updateError(false)
		updateSlug(Date.now() + '')
	}

	let [target, targetRef] = useRefState<HTMLCanvasElement>()
	useBlurImage({
		page: {
			...page,
			link: `${link}?${slug}`
		},
		target,
		shouldBlur: safeMode === SafeMode.blur,
		onError: displayError
	})

	let isCompact = compression === CompressionType.compact
	let isHeavy = compression === CompressionType.heavy

	let isBlur = safeMode === SafeMode.blur

	let Reload = useMemo(
		() => () =>
			isError ? (
				<button
					className={tw`absolute z-10 top-0 appearance-none w-full h-full bg-transparent border-0 text-gray-600 dark:text-gray-400 cursor-pointer`}
					type="button"
					onClick={reloadImage}
				>
					<RotateCw />
				</button>
			) : null,
		[isError]
	)

	if (isBlur)
		return (
			<Figure {...props} isBlur>
				<Reload />
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
				<Reload />
				<Image
					className={className}
					quality={isCompact ? 85 : 60}
					src={link}
					width={width}
					height={height}
					onError={displayError}
				/>
			</Figure>
		)

	return (
		<Figure {...props}>
			<Reload />
			<img
				className={combine(
					imageEffect[safeMode],
					tw`absolute top-0 w-full rounded`,
					className
				)}
				src={`${link}?${slug}`}
				alt="Page"
				onError={displayError}
			/>
		</Figure>
	)
}

export default Page
