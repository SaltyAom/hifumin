import gql from '@saltyaom/gq'

export interface NhqlCoverByIdData {
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

export interface NhqlCoverById {
    nhql: {
        by: {
            data: NhqlCoverByIdData
        }
    }
}

export interface NhqlCoverByIdVariable {
    id: number
}

export const nhqlCoverByIdDocument = `
query getHentaiCoverById($id: Int!) {
  nhql {
    by(id: $id) {
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
}`

const nhqlCoverById = async (id: number): Promise<NhqlCoverByIdData | null> => {
    const data = await gql<NhqlCoverById, NhqlCoverByIdVariable>(
        nhqlCoverByIdDocument,
        {
            variables: {
                id
            }
        }
    )

    if (Array.isArray(data) || data instanceof Error || !data.nhql.by.data)
        return

    return data.nhql.by.data
}

export default nhqlCoverById
