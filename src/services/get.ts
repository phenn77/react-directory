import axios from "axios";
import { GetRequestProps } from "../variables/interfaces";

export const getData = async (req: GetRequestProps) => {
    try {
        const baseUrl: string = process.env.REACT_APP_BE_URL + `${req.directory}`;
        const response = await axios.get(`${baseUrl}/${req.id}`)
        console.log(response);

        return response.data;
    } catch (e) {
        console.log(e);

        throw e;
    }
}