import {imageOrientation} from "../../../utils";
import {Box} from "@mui/material";
import React from "react";
import {ImageProps} from "../../../variables/interfaces";

export const DisplayPicture = (props: ImageProps) => {
    return (
        <Box
            component="img"
            sx={{
                ...(imageOrientation(props.imageUrl)),
                ...(props.directory === 'artist') && {
                    borderRadius: '160px'
                },
                ...(props.directory === 'album' || props.directory === 'single') && {
                    borderRadius: '20px'
                }
            }}
            alt={props.name}
            src={props.imageUrl}
        />
    );
}