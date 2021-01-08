export const isServer = typeof window === 'undefined',
	isNumberString = (text: string) => /^\d+$/.test(text),
	isNhentai = (text: string) => text.length <= 6 && isNumberString(text)
