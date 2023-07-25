import React, {useEffect, useState} from "react";
import {Box, Container, Rating} from "@mui/material";
import {useLocation} from "react-router-dom";
import {getData} from "../../services/get";
import {Directory} from "../../variables/interface";
import {DisplayPicture, Loading} from "../../components/ui";

export const View = () => {
    const {state} = useLocation();
    const [data, setData] = useState<any>();
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
            });
        }, 3000);

        return () => clearTimeout(timeout);
    }

    const content = isLoading ?
        <Loading/> :
        (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'red'
                }}>
                    <DisplayPicture imageUrl={state.imageUrl} name={state.name}/>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Rating
                        defaultValue={data && data.rating !== undefined ? data.rating : 0}
                        precision={0.5}
                        size='large'
                        readOnly/>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    backgroundColor: 'yellow'
                }}>
                    <DisplayPicture imageUrl={state.imageUrl} name={state.name}/>
                    <DisplayPicture imageUrl={state.imageUrl} name={state.name}/>
                    <DisplayPicture imageUrl={state.imageUrl} name={state.name}/>
                    <DisplayPicture imageUrl={state.imageUrl} name={state.name}/>

                </Box>
            </Box>
        );

    return (
        <Container>
            {content}
        </Container>
    );
}