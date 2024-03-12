import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Loading } from "../../components/ui";
import { getData } from "../../services/get";
import { Directory } from "../../variables/interfaces";

export const Edit = () => {
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
    members: [],
    albums: [],
    singles: [],
    socialMedia: [],
    backgroundImage: [],
    displayPicture: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return isLoading ? <Loading /> : <Box></Box>;
};
