import React from "react";
import {ImageProps} from "../../../variables/interfaces";
import {Box} from "@mui/material";

export const MediaImage = (props: ImageProps) => {
    return (
        <Box component="img"
             className={'media-image'}
             sx={{
                 width: '150px',
                 height: '150px',
                 borderRadius: '20px'
             }}
             alt={props.name}
             src={`${props.imageUrl}?fit=contain`}
        />
    )
}