import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getData } from "../../services/get";
import { Directory } from "../../variables/interfaces";
import {
  HeaderWithImage,
  Loading,
  MediaList,
  Rate,
  SocialMedia,
  Summary,
} from "../../components/ui";

export const View = () => {
  const { state } = useLocation();

  useEffect(() => {
    document.title = state.name;
    retrieveData();

    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const [data, setData] = useState<any>({
    name: "",
    summary: "",
    rating: 0,
    members: [],
    albums: [],
    singles: [],
    socialMedia: [],
    backgroundImage: [],
    displayPicture: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  const displayPicture =
    data.displayPicture.length > 0
      ? data.displayPicture[0].fileSrc
      : state.imageUrl;

  const retrieveData = () => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      getData({
        id: state.id,
        directory: state.directory as Directory,
      }).then((res: any) => {
        setData(res);
        setIsLoading(false);
      });
    }, 3000);

    return () => clearTimeout(timeout);
  };

  const content = (
    <Box className={"media"} display={"flex"} flexDirection={"column"}>
      <SocialMedia data={data.socialMedia} />
      <Rate rate={data.rating} />

      {!!data.summary && <Summary summary={data.summary} />}

      {data.members.length > 0 && (
        <MediaList
          directory={"member"}
          data={data.members}
          paginationPosition={"bottom"}
          windowSize={windowSize}
        />
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: 1,
          // backgroundColor: 'yellow'
        }}
      >
        <MediaList
          directory={"album"}
          data={data.members}
          paginationPosition={"right"}
        />
        <MediaList
          directory={"single"}
          data={data.members}
          paginationPosition={"left"}
        />
      </Box>
    </Box>
  );

  return isLoading ? (
    <Loading />
  ) : (
    <Box>
      <HeaderWithImage
        imageThumbnail={displayPicture}
        imageBackground={data.backgroundImage}
        name={state.name}
      />

      <Container
        className={"artistView"}
        sx={{
          mb: "100px",
        }}
      >
        {content}
      </Container>
    </Box>
  );
};
