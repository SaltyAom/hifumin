/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    if (process.env.BUILD == 'true') return resolve(event)

    const addr = event?.clientAddress
    event.locals.addr = addr

    return resolve(event)
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
    return event.locals
}
