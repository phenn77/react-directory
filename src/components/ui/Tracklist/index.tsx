import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export const Tracklist = (props: any) => {
    return (
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                borderRadius: '20px'
            }}
        >
            <Table
                stickyHeader
                aria-label="tracklist"
                sx={{
                    minWidth: {
                        md: 300,
                        lg: 500
                    },
                    maxWidth: {
                        md: 500,
                        lg: 700
                    },
                    "& .MuiTableCell-root": {
                        fontSize: 16
                    }
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>No</TableCell>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row: any, index: number) => (
                        <TableRow
                            key={row}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align={'center'}>
                                {index + 1}
                            </TableCell>
                            <TableCell>{row}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}