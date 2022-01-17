/* eslint-disable no-async-promise-executor */
import { derived, writable, get } from 'svelte/store'
import userStore from '$lib/stores/user'

import supabase from '$lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

import nhqlCoverById from '$lib/gql/nhqlCover'
import type { NhqlCoverByIdData } from '$lib/gql/nhqlCover'

import { isServer } from '$lib/utils'

export interface Collection {
    id: string | null
    uid: string | null
    name: string
    h: number[]
    shared: boolean
    createdAt: string | null
    updatedAt: string | null
}

export const defaultCollection: Record<string, Collection> = {
    'My Favorites': {
        id: null,
        uid: null,
        name: 'My Favorites',
        h: [],
        shared: false,
        createdAt: null,
        updatedAt: null
    }
}

const removeBlankField = (obj: unknown) =>
    Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null))

// Do not manipulate directly, use the `addToCollection` and `removeFromCollection` functions instead
export const collections =
    writable<Record<string, Collection>>(defaultCollection)

export const collectionsArray = derived(collections, (collections) =>
    Object.keys(collections).flatMap((key) => collections[key])
)

export const collectionsData = derived(collectionsArray, (collections) => {
    const collection: Record<number, NhqlCoverByIdData> = {}

    collections.forEach(({ h }) => {
        h.forEach((h) => {
            try {
                const rawData = localStorage.getItem(`h-${h}`)
                const data: NhqlCoverByIdData = JSON.parse(rawData)

                collection[data.id] = data
            } catch (_e) {
                // Empty
            }
        })
    })

    return collection
})

const syncCloudCollections = async (user: SupabaseUser) => {
    const rawPersisted: string | null = localStorage.getItem('collections')

    let persisted: Record<string, Collection> = {}

    if (rawPersisted) {
        persisted = JSON.parse(rawPersisted)
        collections.set(persisted)
    }

    if (!user?.id) return

    const { data } = await supabase
        .from('collections')
        .select('*')
        .eq('uid', user.id)

    const fromCloud = data as Collection[]

    const newCollections = {
        ...persisted
    }

    fromCloud.forEach((collection) => {
        const current = newCollections[collection.name]

        if (current)
            newCollections[collection.name] = {
                ...current,
                ...removeBlankField(collection),
                h: [...new Set([...collection.h, ...current.h])]
            }
        else newCollections[collection.name] = collection
    })

    collections.set(newCollections)

    if (Object.keys(persisted).length > 0) {
        addToCollection.update((v) => [
            ...v,
            ...Object.keys(persisted).flatMap((key) => persisted[key])
        ])

        localStorage.removeItem('collections')
    }

    Object.entries(newCollections).forEach(([, { h }]) => {
        saveCoverToLocal(h)
    })
}

if (!isServer) {
    syncCloudCollections(supabase.auth.user())

    supabase.auth.onAuthStateChange(async (_event, { user }) => {
        syncCloudCollections(user)
    })
}

export const addToCollection = writable<Partial<Collection>[]>([])

addToCollection.subscribe(async (toAdd) => {
    if (!toAdd.length) return

    const user = get(userStore)
    const current = get(collections)

    if (!user?.name) {
        toAdd.forEach((collection) => {
            if (current[collection.name])
                current[collection.name].h = [
                    ...current[collection.name].h,
                    ...collection.h
                ]
            else
                current[collection.name] = {
                    ...defaultCollection['My Favorites'],
                    ...collection
                }
        })

        collections.set(current)
        localStorage.setItem('collections', JSON.stringify(current))

        return
    }

    const operations: Promise<void>[] = []

    toAdd.forEach((collection) => {
        if (!collection || !collection.name) return

        const newCollections = collection.h.filter(
            (h) => !current[collection.name]?.h.includes(h)
        )

        if (collection.name in current)
            collections.update((v) => ({
                ...v,
                [collection.name]: {
                    ...v[collection.name],
                    ...removeBlankField(collection),
                    id: v[collection.name].id,
                    uid: user.id,
                    h: [
                        ...new Set([...v[collection.name].h, ...newCollections])
                    ],
                    updatedAt: new Date().toISOString()
                }
            }))
        else
            collections.update((v) => ({
                ...v,
                [collection.name]: {
                    id: null,
                    uid: user.id,
                    name: collection.name,
                    shared: false,
                    h: collection.h,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            }))

        operations.push(
            new Promise(async (resolve) => {
                try {
                    const newCollection = get(collections)[collection.name]

                    const {
                        data: [synced]
                    } = await supabase
                        .from('collections')
                        .upsert(removeBlankField(newCollection))

                    // In case of null id to be set, we need to update the id
                    collections.update((v) => ({
                        ...v,
                        [collection.name]: synced as Collection
                    }))

                    addToCollection.update((v) =>
                        v.filter(({ name }) => name !== collection.name)
                    )

                    await saveCoverToLocal(newCollection.h)
                } catch (err) {
                    console.warn(err)
                } finally {
                    resolve()
                }
            })
        )
    })

    await Promise.allSettled(operations)
    addToCollection.set([])
})

export const removeFromCollection = writable<Partial<Collection>[]>([])

removeFromCollection.subscribe(async (toRemove) => {
    if (!toRemove.length) return

    const user = get(userStore)
    const current = get(collections)

    if (!user?.name) {
        const newCollections = current

        toRemove.forEach((collection) => {
            newCollections[collection.name].h = newCollections[
                collection.name
            ].h.filter((h) => !current[collection.name].h.includes(h))
        })

        collections.set(newCollections)
        localStorage.setItem('collections', JSON.stringify(newCollections))

        return
    }

    const operations: Promise<void>[] = []

    toRemove.forEach((collection) => {
        const newCollections = current[collection.name].h.filter(
            (h) => !collection.h.includes(h)
        )

        collections.update((v) => ({
            ...v,
            [collection.name]: {
                ...v[collection.name],
                h: [...newCollections],
                updatedAt: new Date().toISOString()
            }
        }))

        operations.push(
            new Promise(async (resolve) => {
                try {
                    const {
                        [collection.name]: { h, id, uid }
                    } = get(collections)

                    await supabase
                        .from('collections')
                        .update({
                            h
                        })
                        .match({
                            id,
                            uid
                        })

                    removeFromCollection.update((v) =>
                        v.filter(({ name }) => name !== collection.name)
                    )

                    h.forEach((h) => {
                        const inOtherCollections = get(collectionsArray).find(
                            ({ h: fav }) => fav.includes(h)
                        )

                        if (inOtherCollections) return
                        localStorage.removeItem(`h-${h}`)
                    })
                } catch (err) {
                    console.warn(err)
                } finally {
                    resolve()
                }
            })
        )
    })

    await Promise.allSettled(operations)
})

export const saveCoverToLocal = async (h: number[]): Promise<void> => {
    const dataOperations = h.map(
        (h) =>
            new Promise<void>(async (resolve) => {
                const persisted = localStorage.getItem(`h-${h}`)

                if (persisted) return
                if (JSON.parse(persisted)) return

                localStorage.setItem(
                    `h-${h}`,
                    JSON.stringify(await nhqlCoverById(h))
                )

                resolve()
            })
    )

    Promise.allSettled(dataOperations)
}
