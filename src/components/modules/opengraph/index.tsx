import Head from 'next/head'

import { web, coverImage, title as TITLE, favicon } from '@services/constants'

import { OpenGraphComponent } from './types'

const OpenGraphMeta: OpenGraphComponent = ({
    title = TITLE,
    description = '',
    image = coverImage
}) => (
    <>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${web}/${image}`} />
        <meta property="og:image:alt" content={title} />

        <meta name="twitter:card" content="description_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${web}/${image}`} />

        <link rel="canonical" href={web} />

        <link
            rel="icon"
            href={
                favicon ??
                'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐳</text></svg>'
            }
        />

        {/* // ? Opengraph */}
        {/* <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: structuredData
                }}
            /> */}
    </>
)

const OpenGraph: OpenGraphComponent = (props) => (
    <Head>
        <OpenGraphMeta {...props} />
    </Head>
)

export { OpenGraphMeta }

export default OpenGraph
