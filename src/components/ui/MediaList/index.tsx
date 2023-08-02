import React, {useState} from "react";
import {Box, ImageList, ImageListItem, useMediaQuery} from "@mui/material";
import {MediaImage} from "../MediaImage";
import {retrieveImageUrl} from "../../../utils";
import {DotPagination} from "../DotPagination";
import SwipeableViews from "react-swipeable-views";
import {useNavigate} from "react-router-dom";
import withWidth from "@mui/material/Hidden/withWidth";

//https://github.com/oliviertassinari/react-swipeable-views

interface MediaData {
    _id: string,
    name: string,
    pictures: [object]
}

interface MediaListProps {
    data: any,
    paginationPosition: 'top' | 'bottom' | 'right' | 'left',
    directory: 'album' | 'single' | 'member'
}

export const MediaList = (props: MediaListProps) => {
    const width = withWidth();
    console.log(width);

    const navigate = useNavigate();

    let mediaLimit = props.directory === 'member' ?
        Number(process.env.REACT_APP_MEMBER_LIMIT) :
        Number(process.env.REACT_APP_MEDIA_LIMIT);

    const totalSteps: number = Math.ceil(props.data.length / mediaLimit);
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    const getInfo = (id: string, name: string, image: any) => {
        navigate(`/${props.directory}/view`, {
            state: {
                id: id,
                name: name,
                imageUrl: image
            },
        });
    };

    const data: Map<number, any[]> = new Map();
    let start: number = 0;

    for (let i: number = 0; i < props.data.length; i++) {
        const mediaData: MediaData = props.data[i];

        const image = (
            <MediaImage
                key={mediaData.name}
                imageUrl={retrieveImageUrl(mediaData.pictures[0])}
                name={mediaData.name}
                directory={props.directory}
                onClick={() => getInfo(mediaData._id, mediaData.name, mediaData.pictures[0])}
            />
        )

        if (i >= mediaLimit) {
            start += 1;
            mediaLimit *= 2;
        }

        let checkData: any[] | undefined = data.get(start);

        if (checkData === undefined) {
            data.set(start, [image]);
        } else {
            checkData.push(image);
            data.set(start, checkData);
        }
    }


    const imageData: any = [];
    for (let i: number = 0; i < totalSteps; i++) {
        imageData.push(
            <Box
                key={`image-${i}`}
                sx={{
                    ...(props.directory !== 'member') && {
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '18px',
                        m: '20px'
                    },
                }}
            >
                {data.get(i)}
            </Box>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            ...(props.directory === 'member') && {
                flexDirection: 'column'
            }
        }}>
            {totalSteps > 1 && props.paginationPosition === 'left' && (
                <DotPagination
                    position={props.paginationPosition}
                    totalSteps={totalSteps}
                    activeStep={activeStep}
                    handleBack={handleBack}
                    handleNext={handleNext}
                />
            )}

            <SwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
            >
                {imageData}
            </SwipeableViews>

            {totalSteps > 1 && props.paginationPosition === 'right' && (
                <DotPagination
                    position={props.paginationPosition}
                    totalSteps={totalSteps}
                    activeStep={activeStep}
                    handleBack={handleBack}
                    handleNext={handleNext}
                />
            )}

            { totalSteps > 1 && props.paginationPosition === 'bottom' && (
                <DotPagination
                    position={props.paginationPosition}
                    totalSteps={totalSteps}
                    activeStep={activeStep}
                    handleBack={handleBack}
                    handleNext={handleNext}
                />
            )}
        </Box>

    )
}