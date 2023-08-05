import {Box} from "@mui/material";
import React from "react";
import {ImageProps} from "../../../variables/interfaces";

export const DisplayPicture = (props: ImageProps) => {
    const image: HTMLImageElement = new Image();
    image.src = props.imageUrl;

    return (
        <Box
            component="img"
            sx={{
                my: '40px',
                objectFit: 'cover',
                ...(props.directory === 'artist') && {
                    borderRadius: {
                        sm: '80px',
                        md: '160px'
                    }
                },
                ...(props.directory === 'album' || props.directory === 'single') && {
                    borderRadius: '20px'
                },
                width: {
                    sm: '160px',
                    md: '320px'
                },
                height: {
                    sm: '160px',
                    md: '320px'
                }
            }}
            alt={props.name}
            src={props.imageUrl}
        />
    );
}