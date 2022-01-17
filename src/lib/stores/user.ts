import { writable } from 'svelte/store'

import supabase from '$lib/supabase'
import { isServer } from '$lib/utils'

interface GoogleMetadata {
    avatar_url: string
    email: string
    email_verified: boolean
    full_name: string
    iss: string
    name: string
    picture: string
    provider_id: string
    sub: string
}

interface User {
    id: string | null
    name: string | null
    profile: string | null
}

export const defaultUser: User = {
    id: null,
    name: null,
    profile: null
}

const user = writable<User>({
    id: null,
    name: null,
    profile: null
})

if (!isServer)
    supabase.auth.onAuthStateChange(async (_event, session) => {
        if (!session?.user) return user.set(defaultUser)

        const {
            user: { id, user_metadata }
        } = session
        const { name, avatar_url } = user_metadata as GoogleMetadata

        user.set({
            id,
            name,
            profile: avatar_url
        })
    })

export default user
