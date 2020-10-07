import { useState, useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { OpenGraphComponent } from './types'
import { isServer } from '@libs'

const OpenGraph: OpenGraphComponent = ({
	title,
	description,
	author = 'Opener Studio',
	icon = '/assets/icon/icon.png',
	image = {
		info: {
			width: 1920,
			height: 1080,
			type: 'jpg'
		},
		link: 'https://opener.studio/assets/images/cover.jpg'
	},
	name = 'Opener Studio',
	twitterDevAccount = '@SaltyAom'
}) => {
	let { pathname } = useRouter()

	let [isDarkTheme, updateIsDarkTheme] = useState(
		isServer
			? true
			: window.matchMedia &&
					window.matchMedia('(prefers-color-scheme: dark)').matches
	)

	useEffect(() => {
		updateIsDarkTheme(
			window.matchMedia &&
				window.matchMedia('(prefers-color-scheme: dark)').matches
		)

		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', ({ matches }) => {
				updateIsDarkTheme(matches)
			})
	}, [])

	return (
		<Head>
			<meta name="title" content={title} />
			<meta name="description" content={description} />
			<meta name="author" content={author} />
			<link rel="icon" href={icon} />
			<link rel="shortcut icon" href={icon} />
			<link rel="canonical" href={`https://opener.studio${pathname}`} />

			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="article:author" content={author} />
			<meta property="og:site_name" content={name} />
			<meta property="og:image" content={image.link} />
			<meta
				property="og:image:width"
				content={image.info.width.toString()}
			/>
			<meta
				property="og:image:height"
				content={image.info.height.toString()}
			/>
			<meta property="og:locale" content="en_US" />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={`https://opener.studio${pathname}`} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:site" content={twitterDevAccount} />
			<meta name="twitter:image" content={image.link} />
			<meta name="twitter:creator" content={twitterDevAccount} />

			<meta
				name="theme-color"
				content={isDarkTheme ? '#1a202c' : '#fff'}
			/>
		</Head>
	)
}

export default OpenGraph
