import gql from '.'

export interface coverByIdData {
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

export interface coverById {
    nhql: {
        by: {
            data: coverByIdData
        }
    }
}

export interface coverByIdVariable {
    id: number
}

export const coverByIdDocument = `
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

const coverById = async (id: number): Promise<coverByIdData | null> => {
    const data = await gql<coverById, coverByIdVariable>(
        coverByIdDocument,
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

export default coverById
