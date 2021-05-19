import { useEffect } from 'react'

import { AppProps } from 'next/app'

import { Provider as JotaiProvider } from 'jotai'

import { Provider as GraphQLProvider } from 'urql'
import { client } from '@services/graphql'

import { PersistanceProvider, BaseLayout } from '@layouts'

import '@styles/init.sass'

const App = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		document.addEventListener('touchstart', () => null, {
			passive: true
		})
	}, [])

	return (
		<JotaiProvider>
			<PersistanceProvider>
				<BaseLayout>
					<GraphQLProvider value={client}>
						<Component {...pageProps} />
					</GraphQLProvider>
				</BaseLayout>
			</PersistanceProvider>
		</JotaiProvider>
	)
}

export default App
