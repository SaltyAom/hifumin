import tw from '@tailwind'

import OpenGraph from '@atoms/opengraph'

import type { StoryErrorComponent } from './types'

const errorMap: Record<string, string> = {
	'[Network] Service Unavailable':
		'Something went wrong.\nUsually nHentai API went down.\nThis usually takes 2-3 hours to resolve'
}

const StoryError: StoryErrorComponent = ({ error = '' }) => {
	let reload = () => {
		window.location.reload()
	}

	return (
		<>
			<OpenGraph title="Opener Studio" />
			<section
				className={tw`flex flex-col justify-center max-w-[360px] w-full mt-8 mx-auto px-2 py-12`}
			>
				<h1
					className={tw`text-xl text-gray-700 dark:text-gray-300 whitespace-pre-line leading-8 m-0 mb-4 font-normal`}
				>
					{errorMap[error ?? ''] ||
						errorMap['[Network] Service Unavailable']}
				</h1>
				<button
					className={tw`appearance-none text-xl text-gray-700 dark:text-gray-400 bg-gray-300 dark:bg-gray-700 font-medium px-6 py-2 rounded border-none cursor-pointer`}
					onClick={reload}
					type="button"
				>
					Reload
				</button>
			</section>
		</>
	)
}

export default StoryError
