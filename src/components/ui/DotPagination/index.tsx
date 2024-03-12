import React from "react";
import { Box, Button, MobileStepper, styled } from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
} from "@mui/icons-material";

interface PaginationProps {
  position: "top" | "bottom" | "left" | "right";
  totalSteps: number;
  activeStep: number;
  handleBack: (event: any) => void;
  handleNext: (event: any) => void;
  activeColor?: string;
  idleColor?: string;
}

export const DotPagination = (props: PaginationProps) => {
  const MobileStepperWithStyle = styled(MobileStepper)(({ theme }) => ({
    "& .MuiMobileStepper-dots": {
      ...((props.position === "left" || props.position === "right") && {
        flexDirection: "column",
      }),
    },
    "& .MuiMobileStepper-dot": {
      backgroundColor: props.idleColor,
      ...((props.position === "left" || props.position === "right") && {
        margin: "2px 0",
      }),
    },
    "& .MuiMobileStepper-dotActive": {
      backgroundColor: props.activeColor,
    },
  }));

  const ButtonWithStyle = styled(Button)(({ theme }) => ({
    backgroundColor: props.activeColor,
    "&.Mui-disabled": {
      backgroundColor: props.idleColor,
    },
  }));

  return (
    <Box
      className={"dot-pagination"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MobileStepperWithStyle
        variant={"dots"}
        steps={props.totalSteps}
        position="static"
        activeStep={props.activeStep}
        backButton={
          <ButtonWithStyle
            size="small"
            onClick={props.handleBack}
            disabled={props.activeStep === 0}
            sx={{
              minWidth: 0,
            }}
          >
            {props.position === "left" || props.position === "right" ? (
              <KeyboardArrowUp />
            ) : (
              <KeyboardArrowLeft />
            )}
          </ButtonWithStyle>
        }
        nextButton={
          <ButtonWithStyle
            size="small"
            onClick={props.handleNext}
            disabled={props.activeStep === props.totalSteps - 1}
            sx={{
              minWidth: 0,
            }}
          >
            {props.position === "left" || props.position === "right" ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowRight />
            )}
          </ButtonWithStyle>
        }
        sx={{
          p: 0,
          background: "transparent",
          ...((props.position === "left" || props.position === "right") && {
            flexDirection: "column",
          }),
        }}
      />
    </Box>
  );
};
