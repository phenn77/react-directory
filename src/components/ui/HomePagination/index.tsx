import React from "react";
import { Box, Pagination } from "@mui/material";
import { PaginationProps } from "../../../variables/interfaces";

export const HomePagination = (props: PaginationProps) => {
  return (
    <Box
      className={"homePagination"}
      sx={{
        display: "flex",
        width: 1,
        justifyContent: "center",
        bottom: 0,
      }}
    >
      <Pagination
        count={props.totalPage}
        page={props.page}
        shape="rounded"
        size="large"
        onChange={props.onChange}
        sx={{
          position: "relative",
          my: "40px",
        }}
      />
    </Box>
  );
};
