import React, { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { HeaderWithText, Loading } from "../../components/ui";
import { BgImageUpload, ImageUpload, Summary } from "../../components/form";
import axios from "axios";
import { Datepicker } from "../../components/ui/Datepicker";

export const Add = () => {
    const [inputs, setInputs] = useState<any>({
        name: '',
        alias: '',
        origin: '',
        birthdate: '',
        summary: '',
        image: '',
        bgImage: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        document.title = 'Add Artist';

        setIsLoading(true);
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    const handleChange = (event: any) => {
        const name: string = event.target.name;
        const value: any = event.target.value;
        setInputs((values: any) => ({ ...values, [name]: value }));
    }

    const handleMandatoryChange = (event: any) => {
        const name: string = event.target.name;
        const value: any = event.target.value;

        setInputs((values: any) => ({ ...values, [name]: value }));
    }

    const handleImg = (event: any, name: string) => {
        console.log(event);
        let img: string;
        if (event == null) {
            img = '';
        } else {
            img = event.target.files[0];
        }

        setInputs((values: any) => ({ ...values, [name]: img }));
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        axios({
            method: "POST",
            url: process.env.REACT_APP_BE_URL + "/artist/add",
            data: inputs,
            headers: {
                "Authorization": "Bearer "
            }
        });
    }

    return (
        isLoading ? <Loading /> : (
            <Container>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <HeaderWithText name={'artist'} />

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        p: '20px'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly'
                        }}>
                            {/* <ImageUpload
                                imageFile={inputPicture['image']}
                                onChange={(event: any) => setInputPicture({image: event.target.files[0]})}
                                onClear={() => setInputPicture({image: ''})}
                            />
                            <BgImageUpload
                                imageFile={inputPicture['bgImage']}
                                onChange={(event: any) => setInputPicture({bgImage: event.target.files[0]})}
                                onClear={() => setInputPicture({bgImage: ''})}
                            /> */}

                            <Box sx={{
                                ...(inputs['image'] !== '' && inputs['bgImage'] === '') && {
                                    pb: '20px'
                                }
                            }}>
                                <ImageUpload
                                    imageFile={inputs.image}
                                    onChange={(event: any) => handleImg(event, 'image')}
                                    onClear={() => handleImg(null, 'image')}
                                />
                            </Box>

                            <Box>
                                <BgImageUpload
                                    imageFile={inputs.bgImage}
                                    onChange={(event: any) => handleImg(event, 'bgImage')}
                                    onClear={() => handleImg(null, 'bgImage')}
                                />
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            {/* REQUIRED */}
                            <TextField
                                onChange={(event: any) => handleMandatoryChange(event)}
                                autoComplete={'off'}
                                name={'name'}
                                placeholder={'name'}
                                margin={"dense"}
                                value={inputs.name}
                                inputProps={{
                                    maxLength: 50
                                }}
                                required
                                error={inputs.name == ''}
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

                            {/* REQUIRED */}
                            <TextField
                                onChange={(event: any) => handleMandatoryChange(event)}
                                autoComplete={'off'}
                                name={'origin'}
                                placeholder={'origin'}
                                margin={"dense"}
                                value={inputs.origin}
                                inputProps={{
                                    maxLength: 10
                                }}
                                required
                                error={inputs.origin == ''}
                            />
                            <Datepicker placeholder="Birthday" />
                        </Box>
                    </Box>

                    {/* REQUIRED */}
                    <Summary
                        input={inputs.summary}
                        onChange={(event: any) => handleMandatoryChange(event)}
                        error={inputs.summary == ''}
                    />

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Button
                            variant={'contained'}
                            disabled={inputs.name == '' && inputs.origin == '' && inputs.summary == ''}
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