import Document, { Html, Head, Main, NextScript } from 'next/document'

import { languageCode } from '@services/constants'

import OpenGraph from '@components/atoms/opengraph'

class OpenerDocument extends Document {
	render() {
		return (
			<Html lang={languageCode}>
				<Head>
					<OpenGraph />
					<meta name="referrer" content="same-origin" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default OpenerDocument
