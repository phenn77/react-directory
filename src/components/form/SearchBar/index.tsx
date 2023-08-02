import React from "react";
import {Box, Button, Fade, InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface SearchProps {
    searchText: string,
    onChange: (event: any) => void,
    showTextField: (event: any) => void,
    closeTextField: (event: any) => void,
    isClicked: boolean
}

export const SearchBar = (props: SearchProps) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            // position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            mb: '5px'
            // transition: 'transform 2s'
        }}>
            <Fade in={props.isClicked}>
                <TextField
                    variant={'standard'}
                    placeholder={'Search...'}
                    onChange={props.onChange}
                    value={props.searchText}
                    autoComplete={'off'}
                    autoFocus={true}
                    sx={{
                        padding: '6px 8px',
                        background: 'whitesmoke',
                        borderBottomLeftRadius: '20px',
                        borderBottomRightRadius: '20px'
                    }}
                    InputProps={{
                        style: {
                            paddingLeft: '20px'
                        },
                        inputProps: {
                            maxLength: 20
                        },
                        disableUnderline: true,
                        endAdornment: (
                            <InputAdornment position={'start'}>
                                <Button
                                    variant={'text'}
                                    onClick={props.closeTextField}
                                    sx={{
                                        background: 'whitesmoke',
                                        color: 'rgba(0, 0, 0, 0.54)',
                                        padding: 0,
                                        minWidth: 0
                                    }}
                                >
                                    <CloseIcon sx={{
                                        fontSize: '30px'
                                    }}/>
                                </Button>
                            </InputAdornment>
                        )
                    }}
                />
            </Fade>

            <Fade in={!props.isClicked}>
                <Button
                    variant={'text'}
                    onClick={props.showTextField}
                    sx={{
                        background: 'whitesmoke',
                        color: 'rgba(0, 0, 0, 0.54)',
                        borderBottomLeftRadius: '20px',
                        borderBottomRightRadius: '20px',
                        position: 'absolute'
                    }}
                >
                    <SearchIcon sx={{
                        fontSize: '30px'
                    }}/>
                </Button>
            </Fade>
        </Box>
    )
}