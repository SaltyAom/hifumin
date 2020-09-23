import { isServer } from '../is'

export const supportsLazyLoad = !isServer
		? 'loading' in document.createElement('img')
		: false,
	supportsShare = !isServer ? (navigator.share ? true : false) : false
