import React from "react";
import { Box, Button } from "@mui/material";

interface BgImageUploadInput {
  imageFile?: any;
  onChange: (event: any) => void;
  onClear: (event: any) => void;
}

export const BgImageUpload = (props: BgImageUploadInput) => {
  const imageUrl: string | undefined = props.imageFile
    ? URL.createObjectURL(props.imageFile)
    : undefined;

  return (
    <Box
      className={"bg-img-upload"}
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
            objectFit: "contain",
            width: {
              sm: "320px",
              md: "400px",
            },
            height: {
              sm: "160px",
              md: "200px",
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
        <Button variant="contained" component="label" color="secondary">
          BG Image
          <input
            type="file"
            accept={"image/*"}
            onChange={props.onChange}
            hidden
            required
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
