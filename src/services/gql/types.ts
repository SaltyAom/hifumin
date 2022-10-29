export interface Cover {
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

export type Preview = Pick<Cover, 'id' | 'images'>
