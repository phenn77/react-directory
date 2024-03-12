import React from "react";
import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  styled,
} from "@mui/material";
import { ImageGalleryProps } from "../../../variables/interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { retrieveImageUrl } from "../../../utils";

export const ImageGallery = (data: any) => {
  const currentDirectory = useLocation().pathname.replace("/", "");
  const navigate = useNavigate();

  const getInfo = (id: string, name: string, image: string) => {
    navigate(`/${currentDirectory}/view`, {
      state: {
        id: id,
        name: name,
        directory: currentDirectory,
        imageUrl: image,
      },
    });
  };

  const images: ImageGalleryProps[] = [];

  if (data.data.length > 0) {
    data.data.forEach((x: any) => {
      images.push({
        id: x._id,
        name: x.name,
        fileSource: retrieveImageUrl(x.displayPicture[0]),
      });
    });
  }

  const ImageListItemWithStyle = styled(ImageListItem)(({ theme }) => ({
    "&:hover": {
      cursor: "pointer",
      opacity: 0.5,
    },
    "& .MuiImageListItemBar-title": {
      color: "black",
      fontWeight: "bold",
      fontSize: "25px",
      whiteSpace: "normal",
    },
    "&:hover .MuiImageListItemBar-title": {
      visibility: "visible",
    },
  }));

  return (
    <Container>
      <ImageList
        className={"image-list"}
        cols={4}
        sx={{
          gridTemplateColumns: {
            xs: "repeat(2, 1fr) !important",
            sm: "repeat(4, 1fr) !important",
            md: "repeat(4, 1fr) !important",
            lg: "repeat(5, 1fr) !important",
          },
        }}
      >
        {images.map((data: ImageGalleryProps) => (
          <ImageListItemWithStyle
            key={data.id}
            sx={{
              padding: "10px",
            }}
          >
            <img
              src={data.fileSource}
              srcSet={data.fileSource}
              alt={data.name}
              loading="lazy"
              onClick={() => getInfo(data.id, data.name, data.fileSource)}
              style={{
                borderRadius: "20px",
                objectFit: "cover",
              }}
            />
            <ImageListItemBar
              title={data.name.toUpperCase()}
              sx={{
                textAlign: "center",
                visibility: "hidden",
                "& .MuiImageListItemBar-title": {
                  fontSize: {
                    sm: "15px",
                    md: "25px",
                    lg: "20px",
                  },
                },
              }}
            />
          </ImageListItemWithStyle>
        ))}
      </ImageList>
    </Container>
  );
};
