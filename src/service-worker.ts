/// <reference lib="webworker" />
import { build, files } from '$service-worker'

import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'

import {
    NetworkFirst,
    StaleWhileRevalidate,
    CacheFirst
} from 'workbox-strategies'

import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

const Time = {
    second: 0,
    minute: 1,
    hour: 2,
    day: 3,
    week: 4,
    month: 5,
    year: 6
} as const

const getTime = (time, unit) => {
    switch (unit) {
        case unit.second:
            return time

        case unit.minute:
            return time * 60

        case unit.hour:
            return time * 3_600

        case unit.day:
            return time * 86_400

        case unit.week:
            return time * 604_800

        case unit.month:
            return time * 2_419_200

        case unit.year:
            return time * 29_030_400

        default:
            return time
    }
}

const staticAssets = build.concat(files)

precacheAndRoute(
    staticAssets.map((url) => ({
        url,
        revision: Date.now().toString()
    }))
)

registerRoute(
    ({ request }) => request.url === '/',
    new StaleWhileRevalidate({
        cacheName: 'start-url'
    })
)

const api = 'https://api.hifumin.app'

registerRoute(
    ({ url: { origin } }) => origin === api,
    new CacheFirst({
        cacheName: 'Hifumin api',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200]
            }),
            new ExpirationPlugin({
                maxEntries: 300,
                maxAgeSeconds: getTime(3, Time.hour)
            })
        ]
    })
)

const nhAssetsOrigin = /https:\/\/[a-z].nhentai.net/

registerRoute(
    ({ url: { origin }, request: { destination } }) =>
        nhAssetsOrigin.test(origin) && destination === 'image',
    new CacheFirst({
        cacheName: 'nhentai-assets',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200]
            }),
            new ExpirationPlugin({
                maxEntries: 600,
                maxAgeSeconds: getTime(1, Time.day)
            })
        ]
    })
)

registerRoute(
    ({ request }) => request.mode === 'navigate',
    new NetworkFirst({
        cacheName: 'pages',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200]
            })
        ]
    })
)
