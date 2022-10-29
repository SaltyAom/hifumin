import gql from '.'

import type { Preview } from './types'

export interface MultiplePreviewByIdData {
    success: boolean
    data: Preview
}

export interface MultiplePreviewById {
    nhql: {
        multiple: {
            success: boolean
            data: MultiplePreviewByIdData[]
        }
    }
}

export interface MultiplePreviewByIdVariable {
    id: number[]
}

export const multiplePreviewByIdDocument = `
query multiplePreviewById($id: Int!) {
  nhql {
    multiple(id: $id) {
      success
      data {
        success
        data {
          id
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

const _cache: Map<string, MultiplePreviewByIdData[]> = new Map()

const multiplePreviewById = async (
    id: number[],
    signal?: AbortSignal
): Promise<MultiplePreviewByIdData[] | null> => {
    id = [...new Set(id)]

    const key = id.join('')

    if(_cache.has(key)) return _cache.get(key)

    const data = await gql<MultiplePreviewById, MultiplePreviewByIdVariable>(
        multiplePreviewByIdDocument,
        {
            config: {
                config: {
                    signal
                }
            },
            variables: {
                id
            }
        }
    )

    if (
        Array.isArray(data) ||
        data instanceof Error ||
        !data.nhql.multiple.data
    )
        return null

    const result = data.nhql.multiple.data
    _cache.set(key, result)

    return result
}

export default multiplePreviewById
