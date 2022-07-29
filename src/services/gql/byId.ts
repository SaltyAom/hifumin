import gql from '.'

export interface HentaiByIdData {
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

export interface HentaiById {
    nhql: {
        by: {
            data: HentaiByIdData
        }
    }
}

export interface HentaiByIdVariable {
    id: number
}

export const hentaiByIdDocument = `query getHentaiById($id: Int!) {
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

const hentaiById = async (id: number): Promise<HentaiByIdData | null> => {
    if (Number.isNaN(id) || id > 1_000_000) return

    const data = await gql<HentaiById, HentaiByIdVariable>(hentaiByIdDocument, {
        variables: {
            id
        }
    })

    if (Array.isArray(data) || data instanceof Error || !data.nhql.by.data)
        return

    return data.nhql.by.data
}

export default hentaiById
