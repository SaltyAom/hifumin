/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request) {
    return {
        cookie: request.headers?.cookie || ''
    }
}
