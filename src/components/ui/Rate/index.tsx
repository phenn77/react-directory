import React from "react";
import {Box, Rating} from "@mui/material";

interface RateProps {
    rate: number
}

export const Rate = (props: RateProps) => {
    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            sx={{
                mt: '20px',
            }}>
            <Rating
                defaultValue={props.rate}
                precision={0.5}
                size='large'
                readOnly
            sx={{
                p: '10px'
            }}/>
        </Box>
    );
}