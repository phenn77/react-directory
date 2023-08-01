import React from "react";
import {Box, InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
    searchText: string,
    onChange: (event: any) => void
}

export const SearchBar = (props: SearchProps) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            mt: '20px',
            background: 'whitesmoke',
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
            left: 0
        }}>
            <Box
                className={'searchIcon'}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'rgba(0, 0, 0, 0.54)'
                }}>
                <SearchIcon sx={{
                    fontSize: '30px'
                }}/>
            </Box>
            <Box
                className={'searchText'}
                sx={{
                    display: 'none'
                }}>
                <TextField
                    variant={'standard'}
                    onChange={props.onChange}
                    value={props.searchText}
                    autoComplete={'off'}
                    InputProps={{
                        style: {
                            paddingLeft: '20px'
                        },
                        disableUnderline: true,
                        endAdornment: (
                            <InputAdornment position={'start'}>
                                <SearchIcon/>
                            </InputAdornment>
                        )
                    }}
                />
            </Box>
        </Box>
    )
}