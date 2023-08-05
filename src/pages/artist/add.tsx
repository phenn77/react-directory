import React, {useEffect, useState} from "react";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {HeaderWithText, Loading} from "../../components/ui";
import {ImageUpload} from "../../components/form";

export const Add = () => {
    const [inputs, setInputs] = useState<any>({
        name: '',
        alias: '',
        summary: ''
    });
    const [inputPicture, setInputPicture] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(true);

    useEffect(() => {
        document.title = 'ADD ARTIST';

        setIsLoading(true);
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    const handleChange = (event: any) => {
        const name: string = event.target.name;
        const value: any = event.target.value;
        setInputs((values: any) => ({...values, [name]: value}));
    }

    // inputs.name === '' ? setIsError(true) : setIsError(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();
    }

    return (
        isLoading ? <Loading/> : (
            <Container>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <HeaderWithText name={'artist'}/>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        p: '20px'
                    }}>
                        <ImageUpload
                            imageFile={inputPicture}
                            onChange={(event: any) => setInputPicture(event.target.files[0])}
                        />

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <TextField
                                onChange={(event: any) => handleChange(event)}
                                autoComplete={'off'}
                                name={'name'}
                                placeholder={'name'}
                                margin={"dense"}
                                value={inputs.name}
                                inputProps={{
                                    maxLength: 50
                                }}
                                required
                                error={isError}
                            />
                            <TextField
                                onChange={(event: any) => handleChange(event)}
                                autoComplete={'off'}
                                name={'alias'}
                                placeholder={'alias'}
                                margin={"dense"}
                                value={inputs.alias}
                                inputProps={{
                                    maxLength: 10
                                }}
                            />
                        </Box>
                    </Box>

                    <Box>

                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Button
                            variant={'contained'}
                            disabled={isError}
                            onClick={(event: any) => handleSubmit(event)}
                            sx={{
                                width: 'max-content'
                            }}
                        >
                            <Typography>
                                submit
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Container>
        )
    )
}