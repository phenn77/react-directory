export const imageOrientation = (url: string) => {
    const image: HTMLImageElement = new Image();
    image.src = url;

    const width: number = image.naturalWidth;
    const height: number = image.naturalHeight;


    let styling: any = {
        my: '40px',
    };

    if (width > height) {
        //LANDSCAPE
        styling.width = '320px';
        styling.height = '288px';
    } else if (width < height) {
        //PORTRAIT
        styling.width = '320px';
        styling.height = '384px';
    } else {
        // THUMBNAIL
        styling.width = '320px';
        styling.height = '320px';
    }

    return styling;
}

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