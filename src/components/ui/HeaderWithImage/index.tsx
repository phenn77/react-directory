import React from "react";
import { Box, styled } from "@mui/material";
import { DisplayPicture } from "../DisplayPicture";

interface HeaderProps {
  imageThumbnail: string;
  imageBackground: any;
  name: string;
}

export const HeaderWithImage = (props: HeaderProps) => {
  const bgImage =
    props.imageBackground.length > 0 ? props.imageBackground[0].fileSrc : "";

  const BoxWithStyle = styled(Box)(({ theme }) => ({
    "&::after": {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      position: "absolute",
      backgroundPosition: {
          sm: 'center',
          md: 'center',
          lg: 'center'
      },
      zIndex: -1,
      content: '""',
      width: "100%",
      height: "100%",
      opacity: 0.6,
    },
  }));

  return (
    <BoxWithStyle
      className={"background-image"}
      sx={{
        width: 1,
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <DisplayPicture
        imageUrl={props.imageThumbnail}
        name={props.name}
        directory={"artist"}
      />
    </BoxWithStyle>
  );
};
