import gql from '.'

export interface NhqlByIdData {
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
        pages: Array<{
            link: string
            info: {
                width: number
                height: number
            }
        }>
    }
    info: {
        amount: number
        favorite: number
        upload: number
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

export interface NhqlById {
    nhql: {
        by: {
            data: NhqlByIdData
        }
    }
}

export interface NhqlByIdVariable {
    id: number
}

export const nhqlByIdDocument = `query getHentaiById($id: Int!) {
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
          pages {
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
          upload
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

const nhqlById = async (id: number): Promise<NhqlByIdData | null> => {
    if(Number.isNaN(id) || id > 500_000) return

    const data = await gql<NhqlById, NhqlByIdVariable>(nhqlByIdDocument, {
        variables: {
            id
        }
    })

    if (Array.isArray(data) || data instanceof Error || !data.nhql.by.data)
        return

    return data.nhql.by.data
}

export default nhqlById
