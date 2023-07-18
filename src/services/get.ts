import axios from "axios";

interface RequestProps {
    id: string,
    directory: 'artist' | 'album' | 'single'
}

export const getData = (req: RequestProps) => {

}