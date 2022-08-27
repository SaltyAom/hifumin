import gql from '.'

import { get } from 'svelte/store'
import settings from '@stores/settings'

import type { Cover } from './types'

export interface SearchResult {
    total: number
    data: Cover[]
}

export interface Search {
    nhql: {
        search: SearchResult
    }
}

export interface SearchVariable {
    with: string
    page?: number
    excludes?: string[]
}

export const searchDocument = `
query getNhentaiBySearch($with: String!, $page: Int = 1, $excludes: [String!]!) {
  nhql {
    search(with: $with, page: $page, excludes: $excludes) {
      total
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

const search = async (search: string, page = 1): Promise<SearchResult> => {
    const {
        filter: { data: excludes, enable }
    } = get(settings)

    if (!search || !page)
        return {
            total: 0,
            data: []
        }

    const data = await gql<Search, SearchVariable>(searchDocument, {
        variables: {
            with: search,
            page,
            excludes: enable ? excludes : []
        }
    })

    if (Array.isArray(data) || data instanceof Error || !data.nhql.search.data)
        return {
            total: 0,
            data: []
        }

    return data.nhql.search
}

export default search
