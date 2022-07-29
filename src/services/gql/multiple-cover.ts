import gql from '.'

import type { Cover } from './types'

export interface MultipleCoverByIdData {
    success: boolean
    data: Cover
}

export interface MultipleCoverById {
    nhql: {
        multiple: {
            success: boolean
            data: MultipleCoverByIdData[]
        }
    }
}

export interface MultipleCoverByIdVariable {
    id: number[]
}

export const multipleCoverByIdDocument = `
query getHentaiCoverById($id: Int!) {
  nhql {
    multiple(id: $id) {
      success
      data {
        success
        data {
          id
          title {
            display
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
          info {
            amount
            favorite
          }
          metadata {
            language
          }
        }
      }
    }
  }
}`

const multipleCoverById = async (
    id: number[]
): Promise<MultipleCoverByIdData[] | null> => {
    const data = await gql<MultipleCoverById, MultipleCoverByIdVariable>(
        multipleCoverByIdDocument,
        {
            variables: {
                id
            }
        }
    )

    if (
        Array.isArray(data) ||
        data instanceof Error ||
        !data.nhql.multiple.data
    )
        return

    return data.nhql.multiple.data
}

export default multipleCoverById
