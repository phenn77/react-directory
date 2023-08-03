import React from "react";
import {Box, styled} from "@mui/material";
import {DisplayPicture} from "../DisplayPicture";

interface HeaderProps {
    imageThumbnail: string,
    imageBackground: string,
    name: string
}

export const HeaderWithImage = (props: HeaderProps) => {
    const BoxWithStyle = styled(Box)(({theme}) => ({
        '&::after': {
            backgroundImage: `url(${props.imageBackground})`,
            backgroundSize: 'cover',
            position: 'absolute',
            zIndex: -1,
            content: '""',
            width: '100%',
            height: '100%',
            opacity: 0.6
        }
    }));

    return (
        <BoxWithStyle sx={{
            width: 1,
            display: 'flex',
            justifyContent: 'center',
            position: 'relative'
        }}>
            <DisplayPicture imageUrl={props.imageThumbnail} name={props.name} directory={'artist'}/>
        </BoxWithStyle>
    )
}