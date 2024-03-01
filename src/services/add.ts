import axios from "axios";
import { AddRequestProps } from "../variables/interfaces";
import { uploadImage } from "./image";

export const addData = async (req: AddRequestProps) => {
    const baseUrl: string = process.env.REACT_APP_BE_URL + `${req.directory}/add`;

    const image = req.requestBody.image;
    const bgImage = req.requestBody.bgImage;

    delete req.requestBody.image;
    delete req.requestBody.bgImage;

    try {
        const response = await axios
            .post(
                baseUrl,
                req.requestBody,
                {
                    headers: {
                        "Authorization": `Bearer ${req.token}`
                    }
                });

        console.log(response);

        // Upload Display Picture
        await uploadImage({
            directory: 'Artist',
            id: response.data._id,
            currentlyUsed: 'true',
            image: image,
            token: req.token,
            isBgImage: 'false'
        });

        // Upload Background Image
        if (bgImage !== null) {
            await uploadImage({
                directory: 'Artist',
                id: response.data._id,
                currentlyUsed: 'true',
                image: image,
                token: req.token,
                isBgImage: 'true'
            });
        }
        
        return response.data;
    } catch (e: any) {
        console.log(e.response.data.message);

        throw e.response.data.message;
    }
}