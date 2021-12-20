import gql from '@saltyaom/gq'

export interface NhqlSearchData {
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
    }
    info: {
        amount: number
        favorite: number
    }
    metadata: {
        language: string
    }
}

export interface NhqlSearch {
    nhql: {
        search: {
            data: NhqlSearchData[]
        }
    }
}

export interface NhqlSearchVariable {
    with: string
    page?: number
}

export const nhqlSearchDocument = `
query getNhentaiBySearch($with: String!, $page: Int = 1) {
  nhql {
    search(with: $with, page: $page) {
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
}`

const nhqlSearch = async (
    search: string,
    page = 1
): Promise<NhqlSearchData[]> => {
    const data = await gql<NhqlSearch, NhqlSearchVariable>(nhqlSearchDocument, {
        variables: {
            with: search,
            page
        }
    })

    if (Array.isArray(data) || data instanceof Error || !data.nhql.search.data)
        return []

    return data.nhql.search.data
}

export default nhqlSearch
