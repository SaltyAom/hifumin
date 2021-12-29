import gql from '@saltyaom/gq'

export interface Comment {
    body: string
    created: number
    user: {
        username: string
        avatar: string
    }
}

export interface NhqlCommentData {
    comments: Array<{
        body: string
        created: number
        user: {
            username: string
            avatar: string
        }
    }>
}

export interface NhqlComment {
    nhql: {
        by: {
            data: NhqlCommentData
        }
    }
}

export interface NhqlCommentVariable {
    id: number
    batch: number
}

export const nhqlCommentDocument = `
query NhqlComment($id: Int!, $batch: Int!) {
  nhql {
    by(id: $id) {
      data {
        comments(batch: $batch) {
          body
          created
          user {
            username
            avatar
          }
        }
      }
    }
  }
}`

const nhqlComment = async (
    variables: NhqlCommentVariable
): Promise<NhqlCommentData | null> => {
    const data = await gql<NhqlComment, NhqlCommentVariable>(
        nhqlCommentDocument,
        {
            variables
        }
    )

    if (Array.isArray(data) || data instanceof Error || !data.nhql.by.data)
        return

    return data.nhql.by.data
}

export default nhqlComment
