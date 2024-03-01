import React from "react";
import { Box, ButtonGroup, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { ActionNavbar } from "..";

interface NavbarProps {
  position: "top" | "left" | "bottom" | "right";
  variant: "contained" | "outlined" | "text";
  data: any;
}

export const Navbar = (props: NavbarProps) => {
  const xAligned: boolean =
    props.position === "top" || props.position === "bottom";

  return (
    <Box
      sx={{
        display: "flex",
        width: 1,
        ...((props.position === "top" || props.position === "bottom") && {
          justifyContent: "center",
        }),
      }}
    >
      <ButtonGroup
        orientation={xAligned ? "horizontal" : "vertical"}
        variant={props.variant}
        sx={{
          position: "fixed",
          ...(props.position === "top" && {
            top: 0,
          }),
          ...(props.position === "left" && {
            left: 0,
          }),
          ...(props.position === "bottom" && {
            bottom: 0,
          }),
          ...(props.position === "right" && {
            right: 0,
          }),
          ...((props.position === "left" || props.position === "right") && {
            height: "100vh",
            justifyContent: "center",
          }),
          zIndex: 1,
        }}
      >
        {props.data.map((dt: any) => {
          return (
            <Tooltip key={dt.name} title={dt.name} followCursor>
              <IconButton component={Link} to={dt.url}>
                {dt.icon}
              </IconButton>
            </Tooltip>
          );
        })}
      </ButtonGroup>

      <ActionNavbar position={"right"} />
    </Box>
  );
};
