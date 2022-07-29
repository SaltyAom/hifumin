import gql from '.'

export interface RelatedHentaiData {
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
        favorite: number
    }
    metadata: {
        language: string
    }
}

export interface RelatedHentaiVariable {
    id: number
}

export interface RelatedHentai {
    nhql: {
        by: {
            success: boolean
            data: {
                related: RelatedHentaiData[]
            }
        }
    }
}

export const getRelatedHentaiDocument = `query GetRelatedHentai($id: Int!) {
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

const getRelatedHentai = async (id: number): Promise<RelatedHentaiData[]> => {
    if (Number.isNaN(id) || id > 1_000_000) return

    const data = await gql<RelatedHentai, RelatedHentaiVariable>(
        getRelatedHentaiDocument,
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

export default getRelatedHentai
