import Link from 'next/link'

import { useAtom } from 'jotai'
import { themeAtom, ThemeMode } from '@stores'

import { BookOpen, Edit2, Heart } from 'react-feather'

import { Page } from '@atoms'

import tw, { combine } from '@tailwind'

import { Bookmark } from './components'
import { twClass as sharedStyle } from './components/styles'

import styles from './cover.module.sass'

import type { ReaderCoverComponent } from './types'

const twClass = {
	content: tw`flex flex-row items-center text-gray-700 dark:text-gray-400 text-lg my-1 font-medium capitalize`
} as const

const ReaderCover: ReaderCoverComponent = ({
	story: {
		id,
		title: { display },
		images: { cover },
		metadata: {
			tags,
			artist: { name: artistName },
			language
		},
		info: { amount, favorite }
	},
	story
}) => {
	let [theme] = useAtom(themeAtom)

	return (
		<header
			className={tw`relative flex flex-col md:flex-row w-full my-8 md:my-12 px-4 xs:mb-0 xs:my-8 gap-4 md:gap-8`}
		>
			<div
				className={combine(
					tw`flex flex-col justify-center items-center`,
					styles.wrapper
				)}
				style={{
					flex: 5
				}}
			>
				<Page page={cover} className={styles.cover} />
			</div>
			<div
				className={tw`flex flex-col justify-center`}
				style={{
					flex: 6
				}}
			>
				<h3
					className={tw`text-sm text-gray-500 dark:text-gray-400 font-light mb-2`}
				>
					{id}
				</h3>
				<h1
					className={tw`text-3xl text-gray-900 dark:text-gray-300 m-0 mb-2 font-semibold`}
				>
					{display}
				</h1>
				<section className={tw`flex flex-col my-2`}>
					<h5 className={twClass.content}>
						<BookOpen className={sharedStyle.contentIcon} />{' '}
						{amount}
					</h5>
					<h5 className={twClass.content}>
						<Heart className={sharedStyle.contentIcon} /> {favorite}
					</h5>
					<h5 className={twClass.content}>
						<Edit2 className={sharedStyle.contentIcon} />{' '}
						{artistName}
					</h5>
					<h5 className={twClass.content}>
						<img
							className={tw`mr-2 w-[24px]`}
							src={`/icons/language@${
								theme === ThemeMode.dark ? 'gray' : 'black'
							}.svg`}
							alt="Language"
						/>
						{language}
					</h5>
				</section>
				<section className={combine(styles.tags, tw`block my-2`)}>
					{tags.map(({ name }) => (
						<Link
							key={name}
							href="/search/[keyword]"
							as={`/search/${name}`}
						>
							<a
								className={combine(
									styles.tag,
									tw`inline-block text-md text-gray-800 dark:text-gray-300 font-medium capitalize mr-1 mb-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 no-underline rounded-sm`
								)}
							>
								{name}
							</a>
						</Link>
					))}
				</section>
				<section className={tw`flex flex-row w-full mt-2`}>
					<Bookmark story={story} />
				</section>
			</div>
		</header>
	)
}

export default ReaderCover
