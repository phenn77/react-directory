import React from "react";
import { Box, Typography, styled } from "@mui/material";

interface SummaryProps {
  summary: string;
}

export const Summary = (props: SummaryProps) => {
  return (
    <Box
      className={"summary-box"}
      component={"fieldset"}
      sx={{
        overflowY: "scroll",
        maxHeight: "300px",
        p: "30px 50px",
        textAlign: "justify",
        m: "30px",
        borderRadius: "20px",
      }}
    >
      <legend
        style={{
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        <Typography variant={"h6"}>SUMMARY</Typography>
      </legend>
      <Typography>{props.summary}</Typography>
    </Box>
  );
};
