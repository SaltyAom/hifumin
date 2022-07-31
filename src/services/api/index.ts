// export const galahad = 'https://user.hifumin.app'
export const galahad = 'http://localhost:8080'

export { default as createCollection } from './collection-create'
export {
    default as getCollectionList,
    type CollectionData
} from './collection-list'
export {
    default as getCollectionStatus,
    type CollectionStatus,
    type CollectionStatusData
} from './collection-status'
export { default as updateFavoriteById } from './favorite-update-by-id'
export { default as isFavorite } from './is-favorite'
export { default as setCollectionByHentai } from './set-collection-by-hentai'
