export const merge = <T extends Object>(a: T, b: Partial<T>): T => ({
	...Object.assign(a, b)
})
