import {imageOrientation} from "../../../utils";
import {Box} from "@mui/material";
import React from "react";

interface DisplayProps {
    imageUrl: string,
    name: string
}

export const DisplayPicture = (props: DisplayProps) => {
    return (
        <Box
            component="img"
            sx={imageOrientation(props.imageUrl)}
            alt={props.name}
            src={`${props.imageUrl}?fit=contain`}
        />
    );
}