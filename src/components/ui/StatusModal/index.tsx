import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { retrieveMessage } from "../../../utils";
import { BorderTop } from "@mui/icons-material";

interface StatusInput {
  status: string;
  message: string;
  open: boolean;
}

export const StatusModal = (props: StatusInput) => {
  const message = retrieveMessage(props.message);

  return (
    <Modal
      className={"statusModal"}
      open={props.open}
      // onClose={handleClose}
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "20px",
          boxShadow: 24,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          color={"white"}
          sx={{
            py: "20px",
            ...(props.status === "success" && {
              background: "green",
            }),
            ...(props.status === "failed" && {
              background: "red",
            }),
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        >
          {props.status}
        </Typography>

        <Typography
          align="center"
          variant="h6"
          sx={{
            py: "5px",
          }}
        >
          {message}
        </Typography>
      </Box>
    </Modal>
  );
};
