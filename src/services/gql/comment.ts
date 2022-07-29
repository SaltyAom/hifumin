import gql from '.'

export interface Comment {
    comment: string
    created: number
    user: {
        username: string
        avatar: string
    }
}

export interface CommentByIdData {
    comments: {
        total: number
        data: Comment[]
    }
}

export interface CommentById {
    nhql: {
        by: {
            data: CommentByIdData
        }
    }
}

export interface CommentByIdVariable {
    id: number
    batch: number
    orderBy: 'NEWEST' | 'OLDEST' | string
}

export const commentByIdDocument = `
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
    variables: CommentByIdVariable
): Promise<CommentByIdData | null> => {
    const data = await gql<CommentById, CommentByIdVariable>(
        commentByIdDocument,
        {
            variables
        }
    )

    if (Array.isArray(data) || data instanceof Error || !data.nhql.by.data)
        return

    return data.nhql.by.data
}

export default nhqlComment
