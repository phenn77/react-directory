import {imageOrientation} from "../../../utils";
import {Box} from "@mui/material";
import React from "react";
import {ImageProps} from "../../../variables/interfaces";

export const DisplayPicture = (props: ImageProps) => {
    return (
        <Box
            component="img"
            sx={imageOrientation(props.imageUrl)}
            alt={props.name}
            src={`${props.imageUrl}?fit=contain`}
        />
    );
}