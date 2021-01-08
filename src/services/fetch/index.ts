export const fetch = async <T extends unknown>(
	href: string,
	options = {}
): Promise<T> => {
	let response: Response = await fetch(href, options)
	let data = await response.json()

	return data
}

export const fetchAsJsonString = async (href: string, options = {}) =>
	JSON.stringify(await fetch(href, options))
