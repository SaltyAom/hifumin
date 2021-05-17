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