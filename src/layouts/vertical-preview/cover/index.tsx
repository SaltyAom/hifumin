import Link from 'next/link'

import { Page } from '@atoms'

import { Heart, BookOpen } from 'react-feather'

import tw from '@tailwind'

import type { VerticalCoverComponent } from './types'

import styles from './cover.module.sass'

const twClass = {
	info: tw`flex flex-row flex-1 items-center text-gray-400 dark:text-gray-400 text-md`
} as const

const VerticalCover: VerticalCoverComponent = ({
	story: {
		id,
		title: { display },
		images: { cover },
		info: { amount = '', favorite = '' }
	}
}) => (
	<Link href="/h/[id]" as={`/h/${id}`}>
		<a
			role="article"
			className={tw`flex flex-col w-full no-underline cursor-pointer`}
		>
			<Page className={styles.page} page={cover} />
			<h2 className={tw`text-lg sm:text-xl text-gray-700 dark:text-gray-200 font-semibold mt-4 mb-2`}>
				{display}
			</h2>
			<footer className={tw`flex flex-row justify-between w-full`}>
				<section className={twClass.info}>
					<Heart width={18} className={tw`mr-2`} />
					{favorite.toLocaleString()}
				</section>
				<section className={twClass.info}>
					<BookOpen width={18} className={tw`mr-2`} />
					{amount.toLocaleString()}
				</section>
			</footer>
		</a>
	</Link>
)

export default VerticalCover