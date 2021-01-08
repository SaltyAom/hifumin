export const get = async <T extends unknown>(
	href: string,
	options = {}
): Promise<T> => {
	let response: Response = await fetch(href, options)
	let data = await response.json()

	return data
}

export const getJsonString = async (href: string, options = {}) =>
	JSON.stringify(await get(href, options))
