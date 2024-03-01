const retrieveImageUrl = (props: any) => {
    let imgUrl: string = '';

    const defaultPicture: boolean | undefined = props.defaultPicture;
    if (defaultPicture) {
        imgUrl = process.env.REACT_APP_BE_URL + props.fileSrc;
    } else {
        imgUrl = props.fileSrc
    }

    return imgUrl;
}

const capitalize = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

const retrieveMessage = (msg: string) => {
    try {
        const message = msg.substring(0, msg.indexOf('.'));

        return message !== '' ? message : msg;
    } catch (e: any) {
        return 'system error.';
    }
}

export {
    capitalize,
    retrieveImageUrl,
    retrieveMessage
}