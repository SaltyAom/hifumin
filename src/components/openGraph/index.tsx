import Head from 'next/head'

import { OpenGraphComponent } from './types'

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
		link: 'https://opener.saltyaom.com/assets/images/cover.jpg'
	},
	name = 'Opener Studio',
	twitterDevAccount = '@SaltyAom',
}) => {
	return (
		<Head>
			<meta name="title" content={title} />
			<meta name="description" content={description} />
			<meta name="author" content={author} />
			<link rel="icon" href={icon} />
			<link rel="shortcut icon" href={icon} />

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

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:site" content={twitterDevAccount} />
			<meta name="twitter:image" content={image.link} />
			<meta name="twitter:creator" content={twitterDevAccount} />
		</Head>
	)
}

export default OpenGraph
