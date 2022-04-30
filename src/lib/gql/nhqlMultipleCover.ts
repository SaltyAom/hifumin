import gql from '.'
import type { NhqlSearchData } from './nhqlSearch'

type NhqlCoverPreview = NhqlSearchData

export interface NhqlMultipleCoverByIdData {
    success: boolean
    data: NhqlCoverPreview
}

export interface NhqlMultipleCoverById {
    nhql: {
        multiple: {
            success: boolean
            data: NhqlMultipleCoverByIdData[]
        }
    }
}

export interface NhqlMultipleCoverByIdVariable {
    id: number[]
}

export const nhqlCoverByIdDocument = `
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

const nhqlMultipleCoverById = async (
    id: number[]
): Promise<NhqlMultipleCoverByIdData[] | null> => {
    const data = await gql<
        NhqlMultipleCoverById,
        NhqlMultipleCoverByIdVariable
    >(nhqlCoverByIdDocument, {
        variables: {
            id
        }
    })

    if (
        Array.isArray(data) ||
        data instanceof Error ||
        !data.nhql.multiple.data
    )
        return

    return data.nhql.multiple.data
}

export default nhqlMultipleCoverById
