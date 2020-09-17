import fetch from 'isomorphic-unfetch'

export default async (href, options = {}) => {
    const res = await fetch(href, options)
    return res.json()
}