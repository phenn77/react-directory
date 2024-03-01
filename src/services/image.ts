import axios from "axios";
import { RetrieveImageProps, UploadImageProps } from "../variables/interfaces";

export const uploadImage = async (req: UploadImageProps) => {
    const baseUrl: string = process.env.REACT_APP_BE_URL + `picture/add`;

    const formData = new FormData();
    formData.append("targetModel", req.directory);
    formData.append("targetId", req.id);
    formData.append("image", req.image);
    formData.append("currentlyUsed", req.currentlyUsed);
    formData.append("isBgImage", req.isBgImage);
    try {
        const response = await axios
            .post(
                baseUrl,
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${req.token}`
                    }
                });

        console.log(response);
    } catch (e: any) {
        console.log(e.response.data.message);

        throw e.response.data.message;
    }
}

export const retrieveImage = async (req: RetrieveImageProps) => {
    const baseUrl: string = process.env.REACT_APP_BE_URL + `picture/images`;

    try {
        const response: any = await axios
            .post(baseUrl, {
                imageId: req.imageId,
                imageName: req.imageName
            });

        return response.fileSrc;
    } catch (e: any) {
        console.log(e);

        throw e;
    }
}