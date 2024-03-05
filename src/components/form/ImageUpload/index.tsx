import React from "react";
import { Box, Button } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

interface ImageUploadInput {
  imageFile?: any;
  onChange: (event: any) => void;
  onClear: (event: any) => void;
  required: boolean;
}

export const ImageUpload = (props: ImageUploadInput) => {
  const imageUrl: string | undefined = props.imageFile
    ? URL.createObjectURL(props.imageFile)
    : undefined;

  return (
    <Box
      className={"imageUpload"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {imageUrl && (
        <Box
          component="img"
          sx={{
            my: "40px",
            objectFit: "cover",
            width: {
              sm: "160px",
              md: "200px",
            },
            height: {
              sm: "160px",
              md: "200px",
            },
            borderRadius: {
              sm: "80px",
              md: "160px",
            },
          }}
          src={imageUrl}
        />
      )}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Button
          variant="contained"
          component="label"
          startIcon={
            props.required && props.imageFile === "" ? (
              <ReportGmailerrorredIcon color="error" fontSize="small" />
            ) : (
              ""
            )
          }
        >
          IMAGE
          <input
            type="file"
            accept={"image/*"}
            onChange={props.onChange}
            hidden
          />
        </Button>
        <Button
          sx={{
            ml: "10px",
            color: "black",
          }}
          disabled={!imageUrl}
          onClick={props.onClear}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};
