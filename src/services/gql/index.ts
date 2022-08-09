import gql from './client'

export {
    default as hentaiById,
    hentaiByIdDocument,
    type HentaiById,
    type HentaiByIdData,
    type HentaiByIdVariable
} from './byId'
export {
    default as commentById,
    commentByIdDocument,
    type Comment,
    type CommentById,
    type CommentByIdData,
    type CommentByIdVariable
} from './comment'
export {
    default as getFavoriteHentais,
    favoriteHentaisDocument,
    type FavoriteHentai,
    type FavoriteHentaiData,
    type FavoriteHentais,
    type FavoriteHentaisVariable
} from './favorite'
export {
    default as multipleCoverById,
    multipleCoverByIdDocument,
    type MultipleCoverById,
    type MultipleCoverByIdData,
    type MultipleCoverByIdVariable
} from './multiple-cover'
export {
    default as relatedById,
    relatedByIdDocument,
    type RelatedById,
    type RelatedByIdVariable
} from './related'
export {
    default as search,
    searchDocument,
    type Search,
    type SearchVariable
} from './search'

export type { Cover } from './types'

export default gql
