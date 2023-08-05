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
                objectFit: 'cover',
                width: {
                    sm: '125px',
                    md: '150px'
                },
                height: {
                    sm: '125px',
                    md: '150px'
                },
                ...(props.directory === 'member') && {
                    borderRadius: '75px',
                    m: {
                        sm: '15px',
                        md: '20px'
                    }
                },
                ...(props.directory !== 'member') && {
                    borderRadius: '20px'
                }
            }}
            alt={props.name}
            src={props.imageUrl}
            onClick={props.onClick}
        />
    )
}