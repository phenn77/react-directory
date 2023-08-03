import React, {useEffect, useState} from "react";
import {DisplayPicture, HeaderWithText, Loading, Rate, Summary, Tracklist} from "../../components/ui";
import {useLocation, useNavigate} from "react-router-dom";
import {getData} from "../../services/get";
import {Directory} from "../../variables/interfaces";
import {Box, Container, Typography} from "@mui/material";

export const View = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [data, setData] = useState<any>({
        name: '',
        summary: '',
        rating: 0,
        releaseYear: '',
        tracklist: [],
        pictures: [],
        artist: {}
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        document.title = state.name;
        retrieveData();
    }, []);

    const retrieveData = () => {
        setIsLoading(true);

        const timeout = setTimeout(() => {
            getData(
                {
                    id: state.id,
                    directory: state.directory as Directory
                }
            ).then((res: any) => {
                setData(res);
                setIsLoading(false);
            }).catch((err: any) => {
                console.log('error');
                navigate(-1)
            });
        }, 3000);

        return () => clearTimeout(timeout);
    }

    return (
        isLoading ? <Loading/> :
            (
                <Container sx={{
                    minHeight: '100vh'
                }}>
                    <Box>
                        <HeaderWithText name={data.name}/>
                        <Typography variant={'h5'} align={'center'}>
                            {data.releaseYear}
                        </Typography>
                    </Box>


                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        py: '20px',
                        minHeight: '75vh'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                            <DisplayPicture
                                imageUrl={state.imageUrl}
                                name={state.name}
                                directory={'album'}
                            />
                            <Rate rate={data.rating}/>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            maxHeight: '75vh'
                            // alignItems: 'center',
                        }}>
                            <Tracklist data={data.tracklist}/>
                        </Box>
                    </Box>

                    {
                        !!data.summary && (
                            <Box>
                                <Summary summary={data.summary}/>
                            </Box>
                        )
                    }
                </Container>
            )
    )
}