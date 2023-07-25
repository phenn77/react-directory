import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, CircularProgressProps, Typography} from "@mui/material";

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{
            width: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center'
        }}>
            <CircularProgress
                variant="determinate"
                size={100}
                {...props}
                sx={{
                    color: 'grey'
                }}/>
            <Box position='absolute'>
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

export const Loading = () => {
    const [progress, setProgress] = useState(25);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress: number): number => (prevProgress >= 100 ? 0 : prevProgress + 25));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <CircularProgressWithLabel value={progress}/>
    );
}
