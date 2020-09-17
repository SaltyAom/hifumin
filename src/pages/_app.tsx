import { Fragment } from 'react'

import Head from 'next/head'
import { AppProps } from 'next/app'

import '@styles/init.styl'

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Fragment>
            <Head>
                <meta
                    name="referrer"
                    content="same-origin"
                    data-react-helmet="true"
                />
            </Head>
            <Component {...pageProps} />
        </Fragment>
    )
}

export default App
