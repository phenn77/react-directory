import axios from "axios";
import { IndexRequestProps, IndexResponseProps } from "../variables/interfaces";

export const fetchData = async (req: IndexRequestProps): Promise<IndexResponseProps> => {
    try {
        const baseUrl: string = process.env.REACT_APP_BE_URL + `${req.directory}`;

        let param = `?page=${req.pageNumber}`;
        if (req.keyword !== '') {
            param += `&keyword=${req.keyword}`;
        }

        const response = await axios.get(`${baseUrl}${param}`)
        console.log(response);

        return response.data;
    } catch (e) {
        console.log(e);

        return {
            totalPage: 1,
            page: 1,
            data: []
        };
    }
};