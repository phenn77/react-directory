import React, { useEffect, useState } from "react";
import {
  DisplayPicture,
  HeaderWithText,
  Loading,
  Rate,
  Summary,
  Tracklist,
} from "../../components/ui";
import { useLocation, useNavigate } from "react-router-dom";
import { getData } from "../../services/get";
import { Directory } from "../../variables/interfaces";
import { Box, Container, Link, Typography } from "@mui/material";

export const View = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

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
    releaseYear: "",
    tracklist: [],
    displayPicture: [],
    artist: {},
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log("data", data);

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
      })
        .then((res: any) => {
          setData(res);
          setIsLoading(false);
        })
        .catch((err: any) => {
          console.log("error");
          navigate(-1);
        });
    }, 3000);

    return () => clearTimeout(timeout);
  };

  const navigateToArtist = () => {
    navigate(`/artist/view`, {
      state: {
        id: data.artist._id,
        name: data.artist.name,
        directory: "artist",
      },
    });
  };

  return (
    <div className="view-album-container">
      {(() => {
        if (isLoading) {
          return <Loading />;
        } else {
          return (
            <Container
              className={"container"}
              sx={{
                minHeight: "100vh",
                mb: "100px",
              }}
            >
              <Box className={"header"} sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
              }}>
                <HeaderWithText name={data.name} />
                <Typography variant={"h5"}>
                  {data.releaseYear}
                </Typography>

                <Link component="button" onClick={() => navigateToArtist()}>
                  {data.artist.name}
                </Link>
              </Box>

              <Box
                className={"data-container"}
                sx={{
                  display: "flex",
                  //   justifyContent: "space-around",
                  p: "30px",
                  minHeight: "70vh",
                }}
              >
                <Box
                  className={"display-picture"}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 1 / 2,
                  }}
                >
                  <DisplayPicture
                    imageUrl={displayPicture}
                    name={state.name}
                    directory={"album"}
                  />
                  <Rate rate={data.rating} />
                </Box>
                <Box
                  className={"tracklist"}
                  sx={{
                    display: "flex",
                    // maxHeight: "70vh",
                    width: 1 / 2,
                    // alignItems: 'center',
                  }}
                >
                  <Tracklist data={data.tracklist} />
                </Box>
              </Box>

              {!!data.summary && (
                <Box className={"summary"}>
                  <Summary summary={data.summary} />
                </Box>
              )}
            </Container>
          );
        }
      })()}
    </div>
  );
};
