export const imageOrientation = (url: string) => {
    const image: HTMLImageElement = new Image();
    image.src = url;

    const width: number = image.naturalWidth;
    const height: number = image.naturalHeight;

    let styling: any = {
        borderRadius: '40px',
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