import { Search } from 'react-feather'

import tw from '@services/tailwind'

import { DiscoverLayoutComponent } from './types'

export const DiscoverLayout: DiscoverLayoutComponent = ({ children, layoutRef }) => {
	return (
		<>
			<header className={tw`sticky top-0 z-30 px-2 py-4 mb-2 bg-white`}>
				<form className={tw`flex flex-row items-center text-gray-600 pl-4 bg-gray-100 rounded-lg`}>
					<Search />
					<input className={tw`w-full text-2xl pl-2 py-3 bg-transparent border-0 outline-none`} type="text" placeholder="Find hentai" />
				</form>
			</header>
			<main ref={layoutRef} className={tw`flex flex-row`}>
				{children}
			</main>
		</>
	)
}

export { DiscoverCard } from './components'