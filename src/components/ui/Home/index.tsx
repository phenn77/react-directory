import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { HomePagination } from "../HomePagination";
import { fetchData } from "../../../services";
import { Loading } from "../Loading";
import {
  Directory,
  IndexData,
  IndexResponseProps,
} from "../../../variables/interfaces";
import { useLocation } from "react-router-dom";
import { SearchBar } from "../../form";
import { ImageGallery } from "../ImageGallery";
import { capitalize } from "../../../utils";

export const Home = () => {
  const currentDirectory: string = useLocation().pathname.replace("/", "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClickedSearch, setIsClickedSearch] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");
  const [data, setData] = useState<IndexData>({
    totalPage: 1,
    page: 1,
    data: [],
  });

  useEffect(() => {
    document.title = capitalize(currentDirectory);
    retrieveData();
  }, [currentDirectory, page]);

  /* BASED ON KEYWORD */
  useEffect(() => {
    setTimeout(() => {
      const minKeywordSearch: number = Number(
        process.env.REACT_APP_MIN_KEYWORD_SEARCH
      );
      if (keyword.length > minKeywordSearch || keyword.length === 0) {
        fetchData({
          pageNumber: page,
          keyword: keyword,
          directory: currentDirectory as Directory,
        }).then((res: IndexResponseProps) => {
          setData(res);
        });
      }
    }, 2000);
  }, [keyword]);
  /* BASED ON KEYWORD */

  const retrieveData = () => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      fetchData({
        pageNumber: page,
        keyword: keyword,
        directory: currentDirectory as Directory,
      }).then((res: IndexResponseProps) => {
        setData(res);
        setIsLoading(false);
      });
    }, 3000);

    return () => clearTimeout(timeout);
  };

  const content = isLoading ? (
    <Loading />
  ) : (
    <>
      <SearchBar
        searchText={keyword}
        onChange={(event: any) => setKeyword(event.target.value)}
        showTextField={() => setIsClickedSearch(true)}
        closeTextField={() => [setIsClickedSearch(false), setKeyword("")]}
        isClicked={isClickedSearch}
      />

      <Box
        className={"homepage"}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container
          sx={{
            height: "80vh",
            overflowY: "scroll",
          }}
        >
          <ImageGallery data={data.data} />
        </Container>

        <HomePagination
          totalPage={data.totalPage}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Box>
    </>
  );

  return (
    <Box
      sx={{
        width: 1,
      }}
    >
      {content}
    </Box>
  );
};
