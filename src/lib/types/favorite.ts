export interface FavoriteHentai {
    id: number
    success: boolean
    created: string
    data?: {
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
}

export interface FavoriteHentaiData {
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
        amount: string
        favorite: string
    }
    metadata: {
        language: string
    }
}
