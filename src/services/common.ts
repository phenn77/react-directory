import axios from "axios";

interface RequestProps {
    pageNumber: number,
    directory: 'artist' | 'album' | 'single'
}
export const fetchData = async (req: RequestProps) => {
    try {
        const baseUrl: string = process.env.REACT_APP_BE_URL + `${req.directory}`;
        const response = await axios.get(`${baseUrl}?page=${req.pageNumber}`)
        console.log(response);

        return response.data;
    } catch (e) {
        console.log(e);
    }
};