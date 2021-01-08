import { AppProps } from 'next/app'
import Head from 'next/head'

import Router, { useRouter } from 'next/router'

import { StoreContext } from 'storeon/react'
import store from '@models'

import { HydrateStoreProvider } from '@providers'

import { Navbar, Footer, ErrorBoundary } from '@components'

import { isServer } from '@services'

// @ts-ignore
import withGA from 'next-ga'

import 'preact/debug'

import '@styles/init.sass'
import '@styles/tailwind.sass'

const excludeFooter = ['/']

const App = ({ Component, pageProps }: AppProps) => {
	let router = useRouter()

	return (
		<>
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
						{!isServer ||
						!excludeFooter.includes(router.pathname) ? (
							<Footer />
						) : null}
					</ErrorBoundary>
				</HydrateStoreProvider>
			</StoreContext.Provider>
		</>
	)
}

const ExportedApp =
	process.env.NODE_ENV === 'production'
		? withGA('UA-178626618-1', Router)(App)
		: App

export default ExportedApp
