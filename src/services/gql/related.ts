import gql from '.'

import type { Cover } from './types'

export interface RelatedByIdVariable {
    id: number
}

export interface RelatedById {
    nhql: {
        by: {
            success: boolean
            data: {
                related: Cover[]
            }
        }
    }
}

export const relatedByIdDocument = `query GetRelatedHentai($id: Int!) {
  nhql {
    by(id: $id) {
      success
      data {
        related {
          id
          title {
            display
          }
          info {
            amount
            favorite
          }
          metadata {
            language
          }
          images {
            cover {
              link
              info {
                width
                height
              }
            }
          }
        }
      }
    }
  }
}`

const relatedById = async (id: number): Promise<Cover[]> => {
    if (Number.isNaN(id) || id > 1_000_000) return

    const data = await gql<relatedById, RelatedByIdVariable>(
        relatedByIdDocument,
        {
            variables: {
                id
            }
        }
    )

    if (Array.isArray(data) || data instanceof Error || !data.nhql.by.success)
        return

    return data.nhql.by.data.related
}

export default relatedById
