import dynamic from 'next/dynamic'

import { useAtom } from 'jotai'
import { CompressionType, safeModeAtom } from '@stores/settings'

import tw, { combine } from '@tailwind'

import { useCompressionType } from '@services/hooks'
import { imageEffect } from '@services/image-effect'

import { Figure } from './components'

import type { PageComponent } from './types'

const Image = dynamic(() => import('next/image'))

export const Page: PageComponent = (props) => {
	let {
		page: {
			link,
			info: { width, height }
		}
	} = props

	let [safeMode] = useAtom(safeModeAtom)
	let compression = useCompressionType()

	let isCompact = compression === CompressionType.compact
	let isHeavy = compression === CompressionType.heavy

	if (isCompact || isHeavy)
		return (
			<Figure {...props}>
				<Image
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
					tw`absolute top-0 w-full rounded`
				)}
				src={link}
				alt='Page'
			/>
		</Figure>
	)
}
