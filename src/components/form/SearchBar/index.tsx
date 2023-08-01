import React from "react";
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
    searchText: string,
    onChange: (event: any) => void
}

export const SearchBar = (props: SearchProps) => {
    return (
        <TextField
            sx={{
                position: 'absolute',
                mt: '20px',
                background: 'whitesmoke',
                borderRadius: '20px'
            }}
            variant={'standard'}
            onChange={props.onChange}
            value={props.searchText}
            autoComplete={'off'}
            InputProps={{
                disableUnderline: true,
                endAdornment: (
                    <InputAdornment position={'start'}>
                        <SearchIcon/>
                    </InputAdornment>
                )
            }}
        />
    )
}