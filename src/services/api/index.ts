import { purgeCollection } from '@stores'

import { purgeCollectionCoverCacheById } from './collection-cover'
import { purgeCollectionListCache } from './collection-list'
import { purgeCollectionPageCacheById } from './collection-page'
import { purgeCollectionOverviewStatusCache } from './favorite-status'

export const galahad = 'https://user.hifumin.app'
// export const galahad = 'http://localhost:8080'

export { default as createCollection } from './collection-create'
export {
    default as collectionCover,
    purgeCollectionCoverCache,
    purgeCollectionCoverCacheById,
    type CollectionCover
} from './collection-cover'
export { default as deleteCollection } from './collection-delete'
export {
    default as getCollectionList,
    type CollectionData
} from './collection-list'
export {
    default as collectionPage,
    purgeCollectionPageCache,
    purgeCollectionPageCacheById
} from './collection-page'
export {
    default as getCollectionStatus,
    type CollectionStatus,
    type CollectionStatusData
} from './collection-status'
export {
    default as collectionOverviewStatus,
    type CollectionOverviewStatus
} from './favorite-status'
export { default as updateFavoriteById } from './favorite-update-by-id'
export { default as isFavorite } from './is-favorite'
export { default as setCollectionByHentai } from './set-collection-by-hentai'
export { default as updateCollection } from './update-collection'

export const purgeCollectionCache = () => {
    purgeCollectionOverviewStatusCache()
    purgeCollectionListCache()
}

export const purgeCollectionById = (collectionId: number) => {
    purgeCollectionCache()

    purgeCollectionCoverCacheById(collectionId)
    purgeCollectionPageCacheById(collectionId)

    purgeCollection.update((collection) => {
        collection.add(collectionId)

        return collection
    })
}
