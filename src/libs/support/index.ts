const isServer = typeof window === 'undefined'
export const supportsLazyLoad = !isServer
    ? 'loading' in document.createElement('img')
    : false
