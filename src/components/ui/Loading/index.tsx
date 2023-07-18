import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, CircularProgressProps} from "@mui/material";

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
