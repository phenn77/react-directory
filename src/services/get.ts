import axios from "axios";
import { GetRequestProps } from "../variables/interfaces";

const getData = async (req: GetRequestProps) => {
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

const getArtistName = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BE_URL}artist/name`);
        return response.data;
    } catch (e) {
        console.log(e);

        throw e;
    }
}

export {
    getData,
    getArtistName
}