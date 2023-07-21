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