import React from 'react';
import {Container, ImageList, ImageListItem, ImageListItemBar, styled} from "@mui/material";
import {ImageGalleryProps} from "../../../variables/interfaces";
import {useLocation, useNavigate} from "react-router-dom";
import {retrieveImageUrl} from "../../../utils";

export const ImageGallery = (data: any) => {
    const currentDirectory = useLocation().pathname.replace("/", "");
    const navigate = useNavigate();

    const getInfo = (id: string, name: string, image: string) => {
        navigate(`/${currentDirectory}/view`, {
            state: {
                id: id,
                name: name,
                directory: currentDirectory,
                imageUrl: image
            },
        });
    };

    const images: ImageGalleryProps[] = [];

    if (data.data.length > 0) {
        data.data.forEach((x: any) => {
            images.push({
                id: x._id,
                name: x.name,
                filename: retrieveImageUrl(x.pictures[0])
            });
        });
    }

    const ImageListItemWithStyle = styled(ImageListItem)(({theme}) => ({
        "&:hover": {
            cursor: "pointer",
            opacity: 0.5,
        },
        "& .MuiImageListItemBar-title": {
            color: 'black',
            fontWeight: 'bold',
            fontSize: '25px',
            whiteSpace: 'normal'
        },
        "&:hover .MuiImageListItemBar-title": {
            visibility: 'visible'
        }
    }));

    return (
        <Container>
            <ImageList
                cols={4}
            >
                {images.map((data: ImageGalleryProps) => (
                    <ImageListItemWithStyle key={data.id} sx={{
                        padding: '10px'
                    }}>
                        <img
                            src={data.filename}
                            srcSet={data.filename}
                            alt={data.name}
                            loading="lazy"
                            onClick={() => getInfo(data.id, data.name, data.filename)}
                            style={{
                                borderRadius: '20px',
                                objectFit: 'cover'
                            }}
                        />
                        <ImageListItemBar
                            title={data.name.toUpperCase()}
                            sx={{
                                textAlign: 'center',
                                visibility: 'hidden',
                                "& .MuiImageListItemBar-title": {
                                    fontSize: {
                                        sm: '15px',
                                        md: '25px'
                                    }
                                }
                            }}
                        />
                    </ImageListItemWithStyle>
                ))}
            </ImageList>
        </Container>
    );
}