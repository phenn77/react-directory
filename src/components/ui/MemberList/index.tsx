import React, {useState} from "react"
import {Box} from "@mui/material";
import {retrieveImageUrl} from "../../../utils";
import {useNavigate} from "react-router-dom";
import {DotPagination} from "../DotPagination";

export const MemberList = (props: any) => {
    const navigate = useNavigate();

    const totalSteps: number = Math.ceil(props.data.length / Number(process.env.REACT_APP_MEMBER_LIMIT));
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
    };

    const getInfo = (id: string, name: string, image: string) => {
        navigate('/member/view', {
            state: {
                id: id,
                name: name,
                imageUrl: image
            },
        });
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            background: 'green'
        }}>
            <Box sx={{
                display: 'flex',
                overflowX: 'scroll',
            }}>
                {props.data.map((val: any) => (
                    <Box
                        className={'member media-image'}
                        component="img"
                        sx={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '75px',
                            m: '20px'
                        }}
                        alt={val.name}
                        src={`${retrieveImageUrl(val.pictures[0])}?fit=contain`}
                        onClick={() => getInfo(val._id, val.name, val.pictures[0])}
                    />
                ))}
            </Box>

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