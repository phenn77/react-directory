import React from 'react';
import {Box, Pagination} from "@mui/material";

interface PaginationProps {
    totalPage: number
}

export const IndexPagination = (props: PaginationProps) => {
    return (
        <Box sx={{
            display: 'flex',
            width: 1,
            justifyContent: 'center'
        }}>
            <Pagination
                count={10}
                shape='rounded'
                size='large'
                sx={{
                position: 'absolute',
                bottom: 0,
                mb: '40px'
            }}/>
        </Box>
    );
}