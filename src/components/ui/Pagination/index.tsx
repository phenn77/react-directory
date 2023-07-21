import React from 'react';
import {Box, Pagination} from "@mui/material";
import {PaginationProps} from "../../../variables/interface";

export const IndexPagination = (props: PaginationProps) => {
    return (
        <Box sx={{
            display: 'flex',
            width: 1,
            justifyContent: 'center'
        }}>
            <Pagination
                count={props.totalPage}
                page={props.page}
                shape='rounded'
                size='large'
                onChange={props.onChange}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    mb: '40px'
                }}/>
        </Box>
    );
}