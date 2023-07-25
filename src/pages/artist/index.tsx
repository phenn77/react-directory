import React, {useEffect, useState} from "react";
import {Box, Container} from "@mui/material";
import {useLocation} from "react-router-dom";
import {getData} from "../../services/get";
import {Directory} from "../../variables/interfaces";
import {DisplayPicture, Loading, Rate, SocialMedia} from "../../components/ui";

export const View = () => {
    const {state} = useLocation();
    const [data, setData] = useState<any>({
        name: '',
        rating: 0,
        socialMedia: []
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
            });
        }, 3000);

        return () => clearTimeout(timeout);
    }

    const content =
        (
            <Box
                display={'flex'}
                flexDirection={'column'}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'red'
                    }}>
                    <DisplayPicture imageUrl={state.imageUrl} name={state.name}/>
                </Box>

                <SocialMedia data={data.socialMedia}/>

                <Rate rate={data.rating}/>

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
            {
                isLoading ? <Loading/> : content
            }
        </Container>
    )
}