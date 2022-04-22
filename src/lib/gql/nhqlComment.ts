import gql, { client } from '@saltyaom/gq'

client.config('https://api.hifumin.app')

export interface Comment {
    comment: string
    created: number
    user: {
        username: string
        avatar: string
    }
}

export interface NhqlCommentData {
    comments: {
        total: number
        data: Comment[]
    }
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
    orderBy: "NEWEST" | "OLDEST" | string
}

export const nhqlCommentDocument = `
query NhqlComment($id: Int!, $batch: Int!, $orderBy: String) {
  nhql {
    by(id: $id) {
      data {
        comments(batch: $batch, orderBy: $orderBy) {
          total
          data {
            comment
            created
            user {
              username
              avatar
            }
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
