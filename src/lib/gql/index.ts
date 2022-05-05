import gql, { client } from '@saltyaom/gql'
import InMemoryCache from '@saltyaom/gql-inmemory-cache'
import LocalCache from '@saltyaom/gql-local-cache'

client.config('https://api.hifumin.app', {
    plugins: [
        InMemoryCache({
            ttl: 60 * 30
        }),
        LocalCache({
            ttl: 60 * 60 * 3
        })
    ],
    "config": {
        "referrer": "unsafe-url"
    }
})

export default gql
