import React, { Fragment, useEffect } from 'react'

import Navbar from '@components/navbar'

import { StoreContext } from 'storeon/react'
import store from '@stores'

import { AppProps } from 'next/app'
import Head from 'next/head'

import Router from 'next/router'
import withGA from 'next-ga'

import { ErrorBoundary } from '@components'

import '@styles/init.styl'
import '@styles/tailwind.styl'
import { HydrateStoreProvider } from '@providers'

const App = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		document.addEventListener('touchstart', () => null, false)

		if (
			'serviceWorker' in navigator &&
			process.env.NODE_ENV === 'production'
		) {
			navigator.serviceWorker.register('/service-worker.js', {
				scope: '/'
			})
		}
	}, [])

	return (
		<Fragment>
			<Head>
				<meta
					name="referrer"
					content="same-origin"
					data-react-helmet="true"
				/>
			</Head>
			<StoreContext.Provider value={store}>
				<HydrateStoreProvider>
					<ErrorBoundary>
						<Navbar />
						<Component {...pageProps} />
					</ErrorBoundary>
				</HydrateStoreProvider>
			</StoreContext.Provider>
		</Fragment>
	)
}

export default withGA('UA-178626618-1', Router)(App)
