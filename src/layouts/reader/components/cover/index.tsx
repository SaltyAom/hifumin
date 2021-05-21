import Link from 'next/link'

import tw, { combine } from '@tailwind'

import { ReaderCoverComponent } from './types'
import { BookOpen, Edit2, Heart } from 'react-feather'

import { Page } from '@atoms'

import styles from './cover.module.sass'

const twClass = {
	content: tw`flex flex-row items-center text-gray-700 text-lg my-1 font-medium capitalize`,
	contentIcon: tw`transform scale-90 mr-2`
} as const

export const ReaderCover: ReaderCoverComponent = ({
	story: {
		id,
		title: { display },
		images: { cover },
		metadata: {
			tags,
			artist: { name: artistName }
		},
		info: { amount, favorite }
	}
}) => (
	<header className={tw`flex flex-col md:flex-row w-full my-8 gap-8`}>
		<div
			className={tw`flex flex-col justify-center items-center`}
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
			<h3 className={tw`text-sm text-gray-500 font-light mb-2`}>{id}</h3>
			<h1 className={tw`text-3xl text-gray-900 m-0 mb-2 font-semibold`}>
				{display}
			</h1>
			<section className={tw`flex flex-col my-2`}>
				<h5 className={twClass.content}>
					<BookOpen className={twClass.contentIcon} /> {amount}
				</h5>
				<h5 className={twClass.content}>
					<Heart className={twClass.contentIcon} /> {favorite}
				</h5>
				<h5 className={twClass.content}>
					<Edit2 className={twClass.contentIcon} /> {artistName}
				</h5>
			</section>
			<section className={combine(styles.tags, tw`block my-2`)}>
				{tags.map(({ name }) => (
					<Link href="/search/[keyword]" as={`/search/${name}`}>
						<a
							className={combine(
								styles.tag,
								tw`inline-block text-md text-gray-800 font-medium capitalize mr-1 mb-1 px-3 py-2 bg-gray-100 no-underline rounded-sm`
							)}
						>
							{name}
						</a>
					</Link>
				))}
			</section>
		</div>
	</header>
)
