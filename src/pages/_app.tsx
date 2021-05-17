import { useEffect } from 'react'

import { AppProps } from 'next/app'

import { Provider as JotaiProvider } from 'jotai'

import { Provider as GraphQLProvider } from 'urql'
import { client } from '@services/graphql'

import { BaseLayout } from '@layouts/base'

import '@styles/init.sass'

const App = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		document.addEventListener('touchstart', () => null, {
			passive: true
		})
	}, [])

	return (
		<JotaiProvider>
			<GraphQLProvider value={client}>
				<BaseLayout>
					<Component {...pageProps} />
				</BaseLayout>
			</GraphQLProvider>
		</JotaiProvider>
	)
}

export default App
