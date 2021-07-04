import { useEffect } from 'react'

import { AppProps } from 'next/app'

import { Provider as JotaiProvider } from 'jotai'

import BaseLayout from '@layouts/base'

import '@styles/init.sass'

const App = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		document.addEventListener('touchstart', () => null, {
			passive: true
		})
	}, [])

	return (
		<JotaiProvider>
			<BaseLayout>
				<Component {...pageProps} />
			</BaseLayout>
		</JotaiProvider>
	)
}

export default App
