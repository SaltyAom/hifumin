import { memo } from 'react'

import Image from 'next/image'

import { useStoreon } from 'storeon/react'
import { SettingEvent, SettingStore } from '@models'

import { PageComponent, PageProps } from './types'

import './page.sass'

const shouldReRender = (prevProps: PageProps, nextProps: PageProps) =>
	prevProps?.page?.link === nextProps?.page?.link

const Page: PageComponent = memo(
	({ page, alt = '', preload = false, children = null, quality = 60 }) => {
		let { safeMode, fullCensor } = useStoreon<SettingStore, SettingEvent>(
			'safeMode',
			'fullCensor'
		)

		if (preload)
			return (
				<div className="page">
					{children}
					<img
						className={`paper -lazy -preload`}
						alt={alt}
					/>
				</div>
			)

		let { link } = page

		return (
			<div className="page">
				{children}
				<Image
					className={`paper ${safeMode ? '-blur ' : ' '}${fullCensor ? '-full-censor' : ''}`}
					src={link}
					alt={alt}
					quality={quality}
					loading="lazy"
					width={page.info.width}
					height={page.info.height}
				/>
			</div>
		)
	},
	shouldReRender
)

export default Page
