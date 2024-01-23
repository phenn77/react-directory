import React from "react";
import {Box, TextField} from "@mui/material";

interface SummaryProps {
    input: string,
    onChange: (event: any) => void,
    error: any
}

export const Summary = (props: SummaryProps) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            p: '30px'
        }}>
            <TextField
                name={'summary'}
                placeholder={'summary'}
                rows={10}
                onChange={props.onChange}
                value={props.input}
                multiline
                sx={{
                    width: 1
                }}
                error={props.error}
                required
            />
        </Box>
    )
}