// Already used in __layout.tsx, no lazy load need
import Cookie from 'js-cookie'

// Return true if user is not authorized
export const invalidateUserOnUnauthorize = async (
    res: Response
): Promise<boolean> => {
    if (res.status === 401 || res.status === 403) {
        try {
            const response = (await res.json()) as {
                error: 'Unauthorized'
            }

            if (response?.error === 'Unauthorized') {
                Cookie.remove('persistedName')
                console.log("Err")
                // window.location.reload()
                return true
            }
        } catch (error) {
            console.error(error)
        }
    }

    return false
}
