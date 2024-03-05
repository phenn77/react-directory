import React from "react";
import { Box, ButtonGroup, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { SocialMediaIcons } from "../../../variables/icon";

interface SocialMediaProps {
  type: string;
  url: string;
}

export const SocialMedia = (props: any) => {
  return (
    <Box
      className={"socialMedia"}
      display={"flex"}
      justifyContent={"space-around"}
    >
      <ButtonGroup>
        {props.data.map((x: SocialMediaProps) => {
          return (
            <IconButton
              component={Link}
              to={x.url}
              key={x.type}
              target={"_blank"}
              sx={{
                "&.MuiButtonBase-root:hover": {
                  backgroundColor: "transparent",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: {
                    sm: "30px",
                    md: "50px",
                  },
                },
              }}
            >
              {SocialMediaIcons[x.type]}
            </IconButton>
          );
        })}
      </ButtonGroup>
    </Box>
  );
};
