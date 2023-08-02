import React, {useState} from "react"
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {DotPagination} from "../DotPagination";
import SwipeableViews from "react-swipeable-views";
import {retrieveImageUrl} from "../../../utils";

interface MemberData {
    _id: string,
    name: string,
    pictures: [object]
}

export const MemberList = (props: any) => {
    const navigate = useNavigate();

    let memberLimit: number = Number(process.env.REACT_APP_MEMBER_LIMIT);
    const totalSteps: number = Math.ceil(props.data.length / memberLimit);
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
        navigate('/member/view', {
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
        const memberData: MemberData = props.data[i];

        const image = (
            <Box
                id={memberData._id}
                key={memberData._id}
                className={'member media-image'}
                component="img"
                sx={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '75px',
                    m: '20px'
                }}
                alt={memberData.name}
                src={`${retrieveImageUrl(memberData.pictures[0])}?fit=contain`}
                onClick={() => getInfo(memberData._id, memberData.name, memberData.pictures[0])}
            />
        );

        if (i >= memberLimit) {
            start += 1;
            memberLimit *= 2;
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
            <div key={`image-${i}`}>
                {data.get(i)}
            </div>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            background: 'green'
        }}>

            <SwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
            >
                {imageData}
            </SwipeableViews>

            {
                totalSteps > 1 ? (
                    <DotPagination
                        position={'bottom'}
                        totalSteps={totalSteps}
                        activeStep={activeStep}
                        handleBack={handleBack}
                        handleNext={handleNext}
                    />
                ) : null
            }
        </Box>
    )
}