import gql from '@saltyaom/gq'

export interface NhqlByIdData {
    id: string
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
        artist: {
            name: string
            count: number
        }
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

export const nhqlByIdDocument = `
query getHentaiById($id: Int!) {
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
          artist {
            name
            count
          }
        }
      }
    }
  }
}`

const nhqlById = async (id: number): Promise<NhqlByIdData | null> => {
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
