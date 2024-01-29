import axios from "axios";
import { LoginRequestProps } from "../variables/interfaces";

export const login = async (req: LoginRequestProps) => {
    const baseUrl: string = process.env.REACT_APP_BE_URL + 'user/login';

    try {
        const response = await axios.post(baseUrl, req);

        console.log(response);

        return response.data;
    } catch (e: any) {
        console.log(e.response.data.message);

        throw e.response.data.message;
    }
}