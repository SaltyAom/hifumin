import { dev } from '$app/environment'

import gql, { client } from '@saltyaom/gql'
import InMemoryCache from '@saltyaom/gql-inmemory-cache'
import LocalCache from '@saltyaom/gql-local-cache'

client.config('https://api.hifumin.app/v1/graphql', {
    plugins: dev
        ? undefined
        : [
              InMemoryCache({
                  ttl: 60 * 30
              }),
              LocalCache({
                  ttl: 60 * 60 * 3
              })
          ]
})

export default gql
