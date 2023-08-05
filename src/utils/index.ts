export const retrieveImageUrl = (props: any) => {
    let imgUrl: string;

    const defaultPicture: boolean | undefined = props.defaultPicture;
    if (defaultPicture) {
        imgUrl = process.env.REACT_APP_BE_URL + props.filename;
    } else {
        imgUrl = props.pictures.get(0).filename;
    }

    return imgUrl;
}