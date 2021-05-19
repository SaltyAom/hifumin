import tw from '@tailwind'

import { ReaderCover } from './components'

import type { ReaderLayoutComponent } from './types'

const key = 'reader-layout'

const twClass = {
	layout: tw`flex flex-col items-center w-full max-w-[760px] mx-auto py-6 px-4 md:px-0`,
	wrapper: tw`flex flex-col items-center w-full max-w-[560px] mx-auto mt-8`
} as const

export const ReaderLayout: ReaderLayoutComponent = ({ children, story, isValid }) => {
	if (!isValid || typeof story === 'undefined')
		return (
			<main key={key} className={twClass.layout}>
				<section className={twClass.wrapper}>{children}</section>
			</main>
		)

	return (
		<article key={key} className={twClass.layout}>
			<ReaderCover story={story} />
			<section className={twClass.wrapper}>{children}</section>
		</article>
	)
}
