import React from "react";
import {ImageProps} from "../../../variables/interfaces";
import {Box} from "@mui/material";

export const MediaImage = (props: ImageProps) => {
    const isMemberDirectory: string = props.directory === 'member' ? 'member' : '';

    return (
        <Box
            key={props.name}
            component="img"
             className={`media-image ${isMemberDirectory}`}
             sx={{
                 width: '150px',
                 height: '150px',
                 ...(props.directory === 'member') && {
                     borderRadius: '75px',
                     m: '20px'
                 },
                 ...(props.directory !== 'member') && {
                     borderRadius: '20px'
                 },
                 objectFit: 'cover'
             }}
             alt={props.name}
             src={props.imageUrl}
             onClick={props.onClick}
        />
    )
}