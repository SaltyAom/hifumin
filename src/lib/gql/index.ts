import gql, { client } from '@saltyaom/gql'
import InMemoryCache from '@saltyaom/gql-inmemory-cache'
import LocalCache from '@saltyaom/gql-local-cache'

import { isServer } from '$lib/utils'

client.config('https://api.hifumin.app', {
    plugins: [
        isServer
            ? InMemoryCache({
                  ttl: 60 * 30
              })
            : LocalCache({
                  ttl: 60 * 60 * 3
              })
    ]
})

export default gql
