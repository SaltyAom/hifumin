export const getHentaiReaderById = `
  query getHentaiById($id: Int!) {
    getHentaiById(id: $id) {
      success
      data {
        id,
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
          amount,
          favorite
        }    
      }
    }
  }
`

export const getPreviews = `
  query getPreview($keyword: String!, $page: Int!) {
    searchHentai(keyword: $keyword, page: $page) {
      success
      data {
        id,
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
      }
    }
  }
`