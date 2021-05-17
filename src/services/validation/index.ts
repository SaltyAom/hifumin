export const isProduction = process.env.NODE_ENV === 'production'
export const isServer = typeof window === 'undefined'
export const isNumberString = (text: string) => /^\d+$/.test(text)
export const isNhentai = (text: string) =>
	text.length <= 6 && isNumberString(text)
