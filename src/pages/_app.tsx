import React, { Fragment, useEffect } from 'react'

import { AppProps } from 'next/app'
import Head from 'next/head'

import Router, { useRouter } from 'next/router'

import { StoreContext } from 'storeon/react'
import store from '@stores'

import { HydrateStoreProvider } from '@providers'

import { Navbar, Footer, ErrorBoundary } from '@components'

import { isServer } from '@libs'

import withGA from 'next-ga'

import 'preact/debug'

import '@styles/init.styl'
import '@styles/tailwind.styl'

const blacklist = ['/']

const App = ({ Component, pageProps }: AppProps) => {
	let router = useRouter()

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
						{!isServer || !blacklist.includes(router.pathname) ? (
							<Footer />
						) : null}
					</ErrorBoundary>
				</HydrateStoreProvider>
			</StoreContext.Provider>
		</Fragment>
	)
}

const ExportedApp =
	process.env.NODE_ENV === 'production'
		? withGA('UA-178626618-1', Router)(App)
		: App

export default ExportedApp
