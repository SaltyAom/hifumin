export const whitelist = ['127.0.0.1', '0.0.0.0', 'localhost']
export const isWhiteList = (ip: string) => whitelist.includes(ip)
