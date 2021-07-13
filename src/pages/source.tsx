import { useState, useRef } from 'react'
import type { DragEventHandler } from 'react'

import tw from '@tailwind'

import { Upload } from 'react-feather'

import { SimilarityLayout } from '@layouts'
import { SimilarityCard } from '@molecules'

import type { HentaiQuery } from '@services/graphql'
import type {
	CombinedSimilarities,
	CombinedSimilarity,
	Similarities,
	Story
} from '@types'
import { OpenGraph } from '@components/atoms'

// const mock = [
// 	{
// 		id: 365079,
// 		similarity: 94.08,
// 		display: 'étude',
// 		cover: {
// 			link: 'https://t.nhentai.net/galleries/1951608/cover.png',
// 			info: { width: 350, height: 490 }
// 		},
// 		info: { amount: 30, favorite: 12879 },
// 		language: 'english'
// 	},
// 	{
// 		id: 295706,
// 		similarity: 93.7,
// 		display: 'étude',
// 		cover: {
// 			link: 'https://t.nhentai.net/galleries/1544290/cover.jpg',
// 			info: { width: 350, height: 490 }
// 		},
// 		info: { amount: 30, favorite: 2766 },
// 		language: 'japanese'
// 	}
// ]

const Source = () => {
	let [hentais, updateHentai] = useState<CombinedSimilarities | null>(null)
	let [isLoading, updateLoading] = useState(false)
	let [preview, updatePreview] = useState('')

	let uploadBox = useRef<HTMLInputElement>(null)

	let pickImage = () => {
		let upload = uploadBox.current

		if (upload) upload.click()
	}

	let upload = async () => {
		if (!uploadBox.current) return

		let images = uploadBox.current.files

		if (!images || !images[0]) return

		updateLoading(true)

		let form = new FormData()

		form.append('file', images[0])
		form.append('user', 'hubot')

		updatePreview(URL.createObjectURL(images[0]))

		let similarities =
			((await fetch('https://searchable.opener.studio/similarity', {
				method: 'POST',
				body: form
			}).then((res) => res.json())) as Similarities) || []

		let relations = similarities.filter(
			({ similarity = 0 }, index) => +similarity > 50 && index < 16
		)

		let details: HentaiQuery<Story>[] = await Promise.all(
			relations.map(({ id }) =>
				fetch(`/api/similar/${id}`).then((res) => res.json())
			)
		)

		let related = relations.map(
			({ id, similarity }, index): CombinedSimilarity => {
				let {
					data: {
						title: { display },
						images: { cover },
						metadata: { language },
						info
					}
				} = details[index]

				return {
					id,
					similarity: +similarity,
					display,
					cover,
					info,
					language
				}
			}
		)

		updateHentai(related)
		updateLoading(false)
	}

	let handleDrop: DragEventHandler = (event) => {
		event.preventDefault()

		let {
			dataTransfer: { files }
		} = event
		let { current: input } = uploadBox

		if (files && input) {
			input.files = files
			upload()
		}
	}

	let handleDragOver: DragEventHandler = (event) => {
		event.preventDefault()
	}

	if (isLoading) {
		return (
			<>
				<OpenGraph
					title="Processing..."
					description="Find original source from image"
				/>
				<section key="layout" className={tw`hidden`}>
					<input
						ref={uploadBox}
						onChange={upload}
						type="file"
						accept="image/png, image/jpg, image/jpeg, image/webp"
					/>
				</section>
				<main
					className={tw`flex flex-col justify-center items-center w-full h-screen mx-auto`}
				>
					<img
						className={tw`max-w-[192px]`}
						src="/gif/a-chan.gif"
						alt="Processing"
						title="Walfie's A-Chan illustration"
					/>
					<h1
						className={tw`text-gray-800 dark:text-gray-200 text-3xl font-medium mt-6 mb-4`}
					>
						Processing
					</h1>
					<p
						className={tw`text-gray-500 dark:text-gray-400 text-base my-0`}
					>
						This usually takes around 5-8 seconds
					</p>
				</main>
			</>
		)
	}

	if (!hentais)
		return (
			<>
				<OpenGraph
					title="Source"
					description="Find original source from image"
				/>
				<link rel="preconnect" as="image" href="/gif/a-chan.gif" />
				<section key="layout" className={tw`hidden`}>
					<input
						ref={uploadBox}
						onChange={upload}
						type="file"
						accept="image/png, image/jpg, image/jpeg, image/webp"
					/>
				</section>
				<section
					className={tw`w-full h-full m-0`}
					onDrop={handleDrop}
					onDragOver={handleDragOver}
				>
					<main
						className={tw`flex flex-col justify-center items-center h-screen mx-auto px-4 py-12`}
					>
						<h1
							className={tw`text-4xl font-medium text-gray-800 dark:text-gray-300 my-0`}
						>
							Source
						</h1>
						<p
							className={tw`text-xl text-gray-600 dark:text-gray-400 my-4`}
						>
							Find original source from image
						</p>
						<button
							className={tw`flex flex-row justify-center items-center appearance-none text-xl text-gray-800 dark:text-gray-200 font-medium mt-4 mb-2 px-6 py-3 border-0 bg-gray-200 dark:bg-gray-700 rounded cursor-pointer`}
							type="button"
							onClick={pickImage}
							title="Upload image"
						>
							Upload Image
							<Upload className={tw`ml-2`} />
						</button>
						<p
							className={tw`text-sm text-gray-400 dark:text-gray-500 mt-2 mb-0`}
						>
							or Drag and Drop file to this page
						</p>
					</main>
				</section>
			</>
		)

	return (
		<>
			<OpenGraph
				title={`(${hentais.length}) - Source`}
				description="Find original source from image"
			/>
			<section key="layout" className={tw`hidden`}>
				<input
					ref={uploadBox}
					onChange={upload}
					type="file"
					accept="image/png, image/jpg, image/jpeg, image/webp"
				/>
			</section>
			<section
				className={tw`w-full h-full m-0 pb-12`}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
			>
				<section
					className={tw`flex flex-col sm:flex-row justify-center items-center w-full max-h-[100vh] sm:max-h-[65vh] sm:h-[460px] mx-auto py-8 sm:py-12`}
				>
					<img
						className={tw`block max-w-[75%] max-h-full m-0`}
						src={preview}
						alt="Preview"
					/>
					<section
						className={tw`flex flex-col justify-center items-start mt-8 sm:mt-0 sm:ml-12`}
					>
						<h1
							className={tw`text-2xl sm:text-3xl text-gray-800 dark:text-gray-300 font-medium mt-0 mb-6`}
						>
							Found {hentais.length} similar stories.
						</h1>
						<button
							className={tw`flex flex-row justify-center items-center appearance-none text-xl text-gray-800 dark:text-gray-200 font-medium mt-4 mb-2 px-6 py-3 border-0 bg-gray-200 dark:bg-gray-700 rounded cursor-pointer`}
							type="button"
							onClick={pickImage}
							title="Upload image"
						>
							Upload Another
							<Upload className={tw`ml-2`} />
						</button>
					</section>
				</section>
				{hentais.length > 0 ? (
					<SimilarityLayout>
						{hentais.map((hentai) => (
							<SimilarityCard key={hentai.id} {...hentai} />
						))}
					</SimilarityLayout>
				) : (
					<section
						className={tw`flex flex-col justify-center items-center max-w-[480px] mx-auto`}
					>
						<div
							className={tw`block w-full overflow-hidden rounded mb-6`}
						>
							<div
								className={tw`block w-full aspect-w-16 aspect-h-9 bg-gray-200 rounded`}
							>
								<img
									className={tw`w-full object-cover object-center rounded`}
									src="/images/ame.jpg"
									alt="Not found"
								/>
							</div>
						</div>
						<h1
							className={tw`text-3xl font-medium text-gray-900 dark:text-gray-200 m-0 mb-3`}
						>
							Not Found
						</h1>
						<p className={tw`text-lg text-gray-500 m-0 mt-1`}>
							Maybe try another image?
						</p>
					</section>
				)}
			</section>
		</>
	)
}

export default Source
