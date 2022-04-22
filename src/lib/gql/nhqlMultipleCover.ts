import gql, { client } from '@saltyaom/gq'

client.config('https://api.hifumin.app')

export interface NhqlCoverPreview {
    id: number
    title: {
        display: string
    }
    images: {
        cover: {
            link: string
            info: {
                width: number
                height: number
            }
        }
    }
    info: {
        amount: number
    }
    metadata: {
        language: string
        tags: Array<{
            name: string
        }>
        artists: Array<{
            name: string
            count: number
        }>
    }
}

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
          }
          metadata {
            language
            tags {
              name
            }
            artists {
              name
              count
            }
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
