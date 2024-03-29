export interface PaginationProps {
    totalPage: number,
    page: number,
    onChange?: (event: any, value: any) => void,
}

export interface IndexData {
    totalPage: number,
    page: number,
    data: []
}

export type Directory = 'artist' | 'album' | 'single';

export interface IndexRequestProps {
    pageNumber: number,
    keyword?: string,
    directory: Directory
}

export interface IndexResponseProps {
    totalPage: number,
    page: number,
    data: []
}

export interface GetRequestProps {
    id: string,
    directory: Directory
}

export interface AddRequestProps {
    directory: string,
    token: string,
    requestBody: any
}

export interface UploadImageProps {
    directory: string,
    id: string,
    image: string,
    currentlyUsed: string,
    token: string,
    isBgImage: string
}

export interface RetrieveImageProps {
    imageId: string,
    imageName: string
}

export interface LoginRequestProps {
    username: string,
    password: string
}

export interface ErrorResponseProps {
    message: string
}

export interface ImageGalleryProps {
    id: string,
    name: string,
    fileSource: string
}

export interface ImageProps {
    imageUrl: string,
    name: string,
    directory?: 'artist' | 'album' | 'single' | 'member',
    onClick?: (event: any) => void
}