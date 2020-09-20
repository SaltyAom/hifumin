import get from 'isomorphic-unfetch'

export const fetch = async (href, options = {}) =>
		(await get(href, options)).json(),
	fetchAsJsonString = async (href, options = {}) =>
		JSON.stringify(await fetch(href, options))
