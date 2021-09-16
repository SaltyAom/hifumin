import Link from 'next/link'

import { useAtom } from 'jotai'
import { searchKeywordAtom, searchSettingAtom } from '@stores'

import { SearchSetting, SettingLayout } from '@layouts/settings'

import tw from '@services/tailwind'

const SearchSettingResult = () => {
	let [suggestions] = useAtom(searchSettingAtom)
	let [search] = useAtom(searchKeywordAtom)

	return (
		<SettingLayout title="Search">
			<SearchSetting />
			<section className={tw`flex flex-col gap-4 w-full pt-2 rounded-lg`}>
				{!suggestions.length && search && (
					<article
						className={tw`flex flex-col items-center w-full text-5xl text-gray-800 dark:text-white pt-4`}
					>
						<figure
							className={tw`relative max-w-420 w-full aspect-w-2 aspect-h-1`}
						>
							<img
								src="/illust/not_found.svg"
								className={tw`w-full`}
								alt="Not found"
							/>
						</figure>
						<h1 className={tw`font-normal m-0`}>
							Setting not found
						</h1>
					</article>
				)}

				{suggestions.map((setting) => (
					<Link href={`/settings/${setting.page}#${setting.id}`}>
						<a
							key={setting.id}
							className={tw`block text-gray-500 dark:text-gray-500 text-lg bg-gray-100 dark:bg-gray-900 py-3 px-4 rounded no-underline`}
							rel="article"
						>
							<h1
								className={tw`text-gray-800 dark:text-gray-200 text-2xl mt-0 mb-2`}
							>
								{setting.title}
							</h1>
							{setting.labels?.map((label) => (
								<p key={label} className={tw`my-0`}>
									{label}
								</p>
							))}
						</a>
					</Link>
				))}
			</section>
		</SettingLayout>
	)
}

export default SearchSettingResult
