import { isServer } from '../is'

export const supportsLazyLoad = !isServer
	? 'loading' in document.createElement('img')
	: false
