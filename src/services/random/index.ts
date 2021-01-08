export const randomBetween = (min: number, max: number) =>
		Math.floor(Math.random() * (max - min + 1) + min),
	randomPick = (data: any[]) => data[randomBetween(0, data.length - 1)]
