import { FunctionComponent, useEffect, useReducer, useState } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { CombinedError, OperationResult } from 'urql'

import { useAtom } from 'jotai'
import { collectHistoryAtom } from '@stores/settings'
import { HistoryActions, historyAtom } from '@stores/history'

import ReaderLayout from '@layouts/reader'

import { Page, ProgressIndicator, OpenGraph, StoryError } from '@atoms'

import tw from '@tailwind'
import { getHentaiReaderById, HentaiQuery } from '@services/graphql'
import type { GetHentaiById, GetHentaiByIdVariables } from '@services/graphql'

import type { Story } from '@types'

interface ReaderProps {
	story: HentaiQuery<Story> | null
	error:
		| OperationResult<GetHentaiById, GetHentaiByIdVariables>['error']
		| undefined
}

const Reader: FunctionComponent<ReaderProps> = ({
	story: initialStory,
	error = null
}) => {
	let [collectHistory] = useAtom(collectHistoryAtom)
	let [, dispatchHistory] = useAtom(historyAtom)

	let {
		query: { id }
	} = useRouter()

	let [story, updateClientStory] = useState(initialStory)
	let [isRetried, updateRetried] = useReducer(() => true, false)

	useEffect(() => {
		updateClientStory(initialStory)
	}, [initialStory])

	useEffect(() => {
		if (typeof story === 'undefined') return
		if (!story || !story.success) return

		if (collectHistory)
			dispatchHistory({
				type: HistoryActions.add,
				story: story.data
			})
	}, [story])

	useEffect(() => {
		// eslint-disable-next-line no-console
		if (isRetried || !error) return
		if (!id) return updateRetried()

		// ? Stop if page change, preventing memory leak
		let controller = new AbortController()
		let done = false

		let retry = async () => {
			let clientStory: HentaiQuery<Story> | null = await fetch(
				`/api/story/${id}`,
				{
					signal: controller.signal
				}
			).then((s) => s.json())

			done = true

			if (clientStory) updateClientStory(clientStory)
			else updateRetried()
		}

		retry()

		return () => {
			if (!done) controller.abort()
		}
	}, [error])

	if (typeof story === 'undefined')
		return (
			<>
				<OpenGraph title="Opener Studio" />
				<ReaderLayout isValid={false}>
					<section
						className={tw`absolute top-0 left-0 flex justify-center items-center w-full h-screen`}
					>
						<ProgressIndicator />
					</section>
				</ReaderLayout>
			</>
		)

	if (error?.message === '[Network] Copyrighted content')
		return (
			<ReaderLayout isValid={false}>
				<section
					className={tw`flex flex-col justify-center items-center gap-4 max-w-sm w-full min-h-full-app px-4 py-8 text-gray-500 dark:text-gray-400 leading-6 text-center`}
				>
					<a
						className={tw`w-48 rounded-lg overflow-hidden`}
						href="https://twitter.com/seseren_kr"
						target="_blank"
						title="Police Chen illustrated by Seseren"
						rel="noreferrer noopener"
					>
						<img
							className={tw`w-full`}
							src="/gif/chen.webp"
							alt="Police Chen illustrated by Seseren"
						/>
					</a>
					<h1
						className={tw`text-gray-700 dark:text-gray-100 text-xl font-medium m-0`}
					>
						Copyrighted content
					</h1>
					<p className={tw`m-0`}>
						To support the artist from copyright infringement, you
						can support the artist by purchasing the original
					</p>
					<section className={tw`flex flex-col gap-4 mt-4`}>
						{error.response?.twitter && (
							<a
								className={tw`text-blue-500 bg-blue-50 dark:bg-blue-900/50 no-underline font-medium rounded px-4 py-2`}
								href={error.response?.twitter}
							>
								Buy the original
							</a>
						)}
						{error.response?.pixiv || error.response?.twitter ? (
							<>
								<div
									className={tw`flex items-center gap-3 text-gray-400 font-light dark:text-gray-500`}
								>
									<div
										className={tw`w-[4rem] h-[1px] bg-gray-300 dark:bg-gray-500`}
									/>
									Or
									<div
										className={tw`w-[4rem] h-[1px] bg-gray-300 dark:bg-gray-500`}
									/>
								</div>
								<section className={tw`flex gap-6`}>
									{error.response?.pixiv && (
										<a
											className={tw`flex flex-1 justify-center text-blue-500 no-underline`}
											href={error.response?.pixiv}
										>
											Pixiv
										</a>
									)}
									{error.response?.twitter && (
										<a
											className={tw`flex flex-1 justify-center text-blue-500 no-underline`}
											href={error.response?.twitter}
										>
											Twitter
										</a>
									)}
								</section>
							</>
						) : null}
					</section>
				</section>
			</ReaderLayout>
		)

	if (error || !story?.success)
		return (
			<ReaderLayout isValid={false}>
				<section className={tw`flex justify-center h-full-app`}>
					<StoryError error={error?.message || ''} />
				</section>
			</ReaderLayout>
		)

	let {
		data: {
			title: { display },
			images: { pages }
		}
	} = story

	return (
		<>
			<OpenGraph title={`${display} - Opener Studio`} />
			<ReaderLayout isValid story={story.data}>
				{pages.map((page) => (
					<Page key={page.link} page={page} />
				))}
			</ReaderLayout>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: true
})

interface Path {
	params: {
		id: string
	}
}

interface Copyright {
	source?: string
	pixiv?: string
	twitter?: string
}

const copyrightMap: Record<string, Copyright> = {
	'nylon101per-Ore no Jiman no Kanojo desu': {
		source: 'https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_215336',
		pixiv: 'https://www.pixiv.net/artworks/95228260',
		twitter: 'https://twitter.com/nylon100per/status/1476944077044486144'
	}
}

const blacklists: Record<number, Copyright> = {
	387778: copyrightMap['nylon101per-Ore no Jiman no Kanojo desu'],
	387585: copyrightMap['nylon101per-Ore no Jiman no Kanojo desu'],
	387353: copyrightMap['nylon101per-Ore no Jiman no Kanojo desu'],
	386971: copyrightMap['nylon101per-Ore no Jiman no Kanojo desu'],
	386737: copyrightMap['nylon101per-Ore no Jiman no Kanojo desu'],
	386007: copyrightMap['nylon101per-Ore no Jiman no Kanojo desu']
}

export const getStaticProps: GetStaticProps<ReaderProps> = async (context) => {
	let {
		params: { id }
	} = context as Path

	if (Object.keys(blacklists).includes(id))
		return {
			props: {
				story: null,
				error: JSON.parse(
					JSON.stringify(
						new CombinedError({
							networkError: new Error('Copyrighted content'),
							response: blacklists[+id]
						})
					)
				)
			}
		}

	let story = await getHentaiReaderById({ id: +id })

	return {
		props: {
			story: story.data?.getHentaiById || null,
			error: JSON.parse(
				JSON.stringify(story.error, (_, v) =>
					typeof v === 'undefined' ? null : v
				)
			)
		},
		revalidate: story.data?.getHentaiById.success || false ? 3600 : 300
	}
}

export default Reader
