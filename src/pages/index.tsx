import { useRef } from 'react'

import Head from 'next/head'

import { useAtom } from 'jotai'
import { searchAtom } from '@stores/search'

import DiscoverLayout from '@layouts/discover'

import OpenGraph from '@atoms/opengraph'
import DiscoverResults from '@molecules/discover'

import { useComputedSpace } from '@services/hooks'

import tw from '@tailwind'
import { ProgressIndicator } from '@components/atoms'

const Discover = () => {
	let [keyword] = useAtom(searchAtom)

	let layout = useRef<HTMLElement>(null)
	let spaces = useComputedSpace(layout)

	return (
		<>
			<Head>
				<link rel="prefetch" href="https://hifumin.app" />
			</Head>
			<OpenGraph title={`${keyword || 'Discover'} - Opener Studio`} />
			<DiscoverLayout key="discover" layoutRef={layout}>
				{keyword ? (
					<section
						className={tw`flex justify-center items-center w-full h-full-app`}
					>
						<ProgressIndicator />
					</section>
				) : (
					<main
						className={tw`flex flex-col justify-center items-center w-full text-gray-700 dark:text-gray-300 gap-4 mt-24 pb-16 text-center leading-relaxed`}
					>
						<h1
							className={tw`text-4xl text-black dark:text-white font-semibold text-center m-0 mb-8`}
						>
							Opener is now{' '}
							<a
								className={tw`text-blue-400 no-underline`}
								href="https://hifumin.app"
							>
								hifumin.app
							</a>
						</h1>
						<p className={tw`m-0`}>
							As you might have noticed lately, Opener Studio is
							not very stable.
						</p>
						<p className={tw`m-0`}>
							In fact, a lot of nHentai client is not functioning
							properly.
							<br />
							Tachiyomi, and many client is not functioning
							<br />
							NClientV2 is working but slow.
						</p>
						<p className={tw`m-0`}>
							This happened from nHentai is now using Cloudflare
							to increase Security for months.
							<br />
							Leading to global API failure but we can't blame
							them for that.
						</p>
						<p className={tw`m-0`}>
							Opener is also one service that is using nHentai
							too,
							<br />
							so we suffered the same condition as everyone else.
						</p>
						<p className={tw`my-0`}>
							Opener will be shutdown at 20 July 2022.
						</p>
						<p className={tw`my-4 text-lg font-bold`}>
							But we are not letting that, stopping us here.
						</p>
						<p className={tw`m-0`}>
							Opener is created for everyone could have a better
							experience reading Hentai.
							<br />
							From I, single developer, volenteerly without any
							gains or profits.
						</p>
						<p className={tw`m-0`}>
							Since the creation of Opener, I've gained absolutely
							0 penny.
							<br />
							Opener gains no profits, only here to make the
							experience of reading Hentai better.
						</p>
						<p className={tw`mt-4 mb-0 text-lg font-bold`}>
							And I don't want to make that vision stop here.
						</p>
						<p className={tw`mb-4 mt-0 text-lg font-bold`}>
							That's why I'm rebranding Opener to{' '}
							<a
								className={tw`text-blue-400 no-underline`}
								href="https://hifumin.app"
							>
								Hifumin
							</a>
						</p>
						<p className={tw`my-0`}>
							From the experience of working on Opener.
							<br />
							Hifumin is entirely re-engineered from the ground
							up.
						</p>
						<p className={tw`my-0`}>
							Hifumin is not a clone of Opener, but an entirely
							different level of product.
						</p>
						<p className={tw`my-0`}>
							It extends vision of Opener, making it more
							accessible.
							<br />
							But the ultimate goal is to push technology to the
							absolute limits.
						</p>
						<p className={tw`my-0`}>
							Hifumin is a collection of services, all working
							together to create one simple product.
						</p>
						<p className={tw`mt-4 mb-0 text-lg font-bold`}>
							The world fastest, most consistant Hentai reader.
						</p>
						<p className={tw`my-0`}>
							Even if nHentai is down, Hifumin will still be
							working.
							<br />
							Making it truly globally accessible.
						</p>
						<p className={tw`my-0`}>
							I whole heartly thank you all for using Opener.
							<br />
							And I want to invite you to see the new chapter of
							our platform, together.
						</p>
						<p className={tw`my-0`}>
							— Sincerly,{' '}
							<a
								className={tw`text-black font-medium dark:text-white no-underline`}
								href="https://github.com/SaltyAom"
								rel="noopener noreferrer"
								target="_blank"
							>
								SaltyAom
							</a>
						</p>
						<a
							className={tw`text-white font-medium text-lg bg-blue-500 px-4 py-2 rounded no-underline mt-6`}
							href="https://hifumin.app"
						>
							Go to Hifumin.app
						</a>
					</main>
				)}
			</DiscoverLayout>
		</>
	)
}

export default Discover
