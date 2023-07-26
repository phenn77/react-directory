import React from "react";
import {Box} from "@mui/material";

interface SummaryProps {
    summary: string
}

export const Summary = (props: SummaryProps) => {
    return (
        <Box
            component={'fieldset'}
            sx={{
                overflowY: 'scroll',
                height: '200px',
                p: '20px',
                textAlign: 'justify',
                my: '20px',
                borderRadius: '20px'
            }}>
            <legend style={{
                textAlign: 'center',
                fontWeight: 'bold'
            }}>
                SUMMARY
            </legend>

            {props.summary}
        </Box>
    )
}