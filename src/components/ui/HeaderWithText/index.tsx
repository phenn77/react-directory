import React from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  name: string;
}
export const HeaderWithText = (props: Props) => {
  return (
    <Box
      component={Typography}
      className={"header-with-name"}
      variant={"h2"}
      align={"center"}
      sx={{
        textWrap: "balance",
        fontWeight: 600,
        mt: "40px",
      }}
    >
      {props.name.toUpperCase()}
    </Box>
  );
};
