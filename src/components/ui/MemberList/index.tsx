import React from "react"
import {Box, styled} from "@mui/material";
import {retrieveImageUrl} from "../../../utils";

const ImageWithStyle = styled(Box)(({theme}) => ({
    "&:hover": {
        transform: 'scale(1.5)',
        opacity: 1,
    },
}));

export const MemberList = (props: any) => {
    return (
        <Box sx={{
            display: 'flex',
            overflowX: 'scroll',
            background: 'green'
        }}>
            {props.data.map((val: any) => (
                <Box
                    className={'member'}
                    component="img"
                     sx={{
                         width: '150px',
                         height: '150px',
                         borderRadius: '75px',
                         m: '20px',
                         opacity: 0.8
                     }}
                     alt={val.name}
                     src={`${retrieveImageUrl(val.pictures[0])}?fit=contain`}
                />
            ))}
        </Box>
    )
}