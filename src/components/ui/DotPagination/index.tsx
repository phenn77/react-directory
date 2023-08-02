import React from "react";
import {Box, Button, MobileStepper, styled} from "@mui/material";
import {KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp} from "@mui/icons-material";

interface PaginationProps {
    position: "top" | "bottom" | "left" | "right",
    totalSteps: number,
    activeStep: number,
    handleBack: (event: any) => void,
    handleNext: (event: any) => void
}

export const DotPagination = (props: PaginationProps) => {
    const MobileStepperWithStyle = styled(MobileStepper)(({theme}) => ({
        '& .MuiMobileStepper-dots': {
            ...(props.position === 'left' || props.position === 'right') && {
                flexDirection: 'column'
            }
        },
        '& .MuiMobileStepper-dot': {
            ...(props.position === 'left' || props.position === 'right') && {
                margin: '2px 0'
            }
        }
    }));

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <MobileStepperWithStyle
                variant={'dots'}
                steps={props.totalSteps}
                position="static"
                activeStep={props.activeStep}
                backButton={
                    <Button size="small"
                            onClick={props.handleBack}
                            disabled={props.activeStep === 0}
                            sx={{
                                minWidth: 0
                            }}
                    >
                        {
                            props.position === 'left' || props.position === 'right' ? (
                                <KeyboardArrowUp/>
                            ) : (
                                <KeyboardArrowLeft/>
                            )
                        }
                    </Button>
                }
                nextButton={
                    <Button size="small"
                            onClick={props.handleNext}
                            disabled={props.activeStep === props.totalSteps - 1}
                            sx={{
                                minWidth: 0
                            }}
                    >
                        {
                            props.position === 'left' || props.position === 'right' ? (
                                <KeyboardArrowDown/>
                            ) : (
                                <KeyboardArrowRight/>
                            )
                        }
                    </Button>
                }
                sx={{
                    p: 0,
                    background: 'transparent',
                    ...((props.position === 'left' || props.position === 'right') && {
                        flexDirection: 'column'
                    }),
                }}
            />
        </Box>
    )
}