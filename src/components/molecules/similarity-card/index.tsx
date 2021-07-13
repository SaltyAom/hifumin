import Link from 'next/link'

import tw, { combine } from '@tailwind'

import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import { BookOpen, Heart } from 'react-feather'
import { Page, Language } from '@atoms'

import type { SimilarityCardComponent } from './types'

import styles from './similarity-card.module.sass'

const SimilarityCard: SimilarityCardComponent = ({
	id,
	similarity,
	display,
	cover,
	info: { favorite, amount },
	language
}) => {
	return (
		<Link href="/h/[id]" as={`/h/${id}`}>
			<a
				role="article"
				className={tw`text-gray-900 dark:text-gray-200 no-underline cursor-pointer`}
			>
				<div className={combine(tw`rounded`, styles.card)}>
					<Page page={cover} />
				</div>
				<p className={tw`text-sm text-gray-500 dark:text-gray-400 mt-4 mb-0`}>{id}</p>
				<section
					className={tw`flex flex-row justify-between items-center my-2`}
				>
					<h3
						className={tw`text-2xl text-gray-800 dark:text-gray-300 font-medium capitalize pr-4 my-0`}
					>
						{display}
					</h3>
					<div className={tw`min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px]`}>
						<CircularProgressbar
							styles={{
								path: {
									stroke: '#007aff'
								},
								trail: {
									stroke: 'rgba(0,0,0,.1)'
								},
								text: {
									fill: '#007aff',
									fontSize: 48,
									transform: 'translateY(4px)'
								}
							}}
							value={similarity}
							text={`${Math.round(similarity)}`}
						/>
					</div>
				</section>
				<p
					className={tw`flex flex-row items-center w-full text-gray-600 dark:text-gray-400 capitalize mt-4 mb-2`}
				>
					<Language className={tw`w-[24px] h-[24px] mr-2`} />
					{language}
				</p>
				<section
					className={tw`flex flex-row justify-between items-center text-gray-600 dark:text-gray-400 mt-4`}
				>
					<p className={tw`flex flex-row flex-1 items-center m-0`}>
						<BookOpen className={tw`mr-2 transform scale-75`} />
						{amount}
					</p>
					<p className={tw`flex flex-row flex-1 items-center m-0`}>
						<Heart className={tw`mr-2 transform scale-75`} />
						{favorite}
					</p>
				</section>
			</a>
		</Link>
	)
}

export default SimilarityCard
