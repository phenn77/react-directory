import axios from "axios";
import {IndexRequestProps, IndexResponseProps} from "../variables/interfaces";

export const fetchData = async (req: IndexRequestProps): Promise<IndexResponseProps> => {
    try {
        const baseUrl: string = process.env.REACT_APP_BE_URL + `${req.directory}`;
        const response = await axios.get(`${baseUrl}?page=${req.pageNumber}&keyword=${req.keyword}`)
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