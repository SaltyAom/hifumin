import { get } from 'svelte/store'
import settings from '$lib/stores/settings'

import gql, { client } from '@saltyaom/gq'
import { api } from '$lib/data'

client.config('https://api.hifumin.app')

export interface NhqlSearchData {
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
    excludes?: string[]
}

export const nhqlSearchDocument = `
query getNhentaiBySearch($with: String!, $page: Int = 1, $excludes: [String!]!) {
  nhql {
    search(with: $with, page: $page, excludes: $excludes) {
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
    const {
        filter: { data: excludes, enable }
    } = get(settings)

    const data = await gql<NhqlSearch, NhqlSearchVariable>(nhqlSearchDocument, {
        endpoint: api.akashic,
        variables: {
            with: search,
            page,
            excludes: enable ? excludes : []
        }
    })

    if (Array.isArray(data) || data instanceof Error || !data.nhql.search.data)
        return []

    return data.nhql.search.data
}

export default nhqlSearch
