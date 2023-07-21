import React from 'react';
import {Container, ImageList, ImageListItem, ImageListItemBar, styled} from "@mui/material";
import {ImageGalleryProps} from "../../../variables/interface";
import {useLocation, useNavigate} from "react-router-dom";

export const ImageGallery = (data: any) => {
    const currentDirectory = useLocation().pathname.replace("/", "");
    const navigate = useNavigate();

    const getInfo = (id: string) => {
        navigate(`/${currentDirectory}/view`, {
            state: {id: id},
        });
    };

    const images: ImageGalleryProps[] = [];

    if (data.data.length > 0) {
        data.data.forEach((x: any) => {
            let imgUrl: string;

            const defaultPicture: boolean | undefined = x.pictures[0].defaultPicture;
            if (defaultPicture) {
                imgUrl = process.env.REACT_APP_BE_URL + x.pictures[0].filename;
            } else {
                imgUrl = x.pictures.get(0).filename;
            }

            images.push({
                id: x._id,
                name: x.name,
                filename: imgUrl
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
                sx={{
                    pt: '20px'
                }}>
                {images.map((data: ImageGalleryProps) => (
                    <ImageListItemWithStyle key={data.id} sx={{
                        padding: '10px'
                    }}>
                        <img
                            src={`${data.filename}?fit=contain`}
                            srcSet={`${data.filename}?fit=contain`}
                            alt={data.name}
                            loading="lazy"
                            onClick={() => getInfo(data.id)}
                            style={{
                                borderRadius: '20px'
                            }}
                        />
                        <ImageListItemBar
                            title={data.name.toUpperCase()}
                            sx={{
                                // background: 'grey',
                                textAlign: 'center',
                                // top: 0,
                                // bottom: 0,
                                visibility: 'hidden'
                            }}
                        />
                    </ImageListItemWithStyle>
                ))}
            </ImageList>
        </Container>
    );
}