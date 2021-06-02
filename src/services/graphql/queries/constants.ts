export const GET_HENTAI_READER_BY_ID = `
  query getHentaiReaderById($id: Int!) {
    getHentaiById(id: $id) {
      success
      data {
        id
        title {
          display
        }
        metadata {
          tags {
            name
          }
          artist {
            name
          }
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
        }    
      }
    }
  }
`

export const GET_SINGLE_PREVIEW_QUERY = `
  query getPreview($id: Int!) {
    searchHentai(keyword: $id) {
      success
      data {
        id
        title {
          display
        }
        metadata {
          tags {
            name
          }
          artist {
            name
          }
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
        info {
          amount
          favorite
        }
      }
    }
  }
`

export const GET_PREVIEWS_QUERY = `
  query getPreview($keyword: String!, $page: Int!) {
    searchHentai(keyword: $keyword, page: $page) {
      success
      data {
        id
        title {
          display
        }
        metadata {
          tags {
            name
          }
          artist {
            name
          }
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
        info {
          amount
          favorite
        }
      }
    }
  }
`