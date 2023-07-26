import React, {useEffect, useState} from "react";
import {Box, Container} from "@mui/material";
import {useLocation} from "react-router-dom";
import {getData} from "../../services/get";
import {Directory} from "../../variables/interfaces";
import {DisplayPicture, Header, Loading, Rate, SocialMedia, Summary} from "../../components/ui";

export const View = () => {
    const {state} = useLocation();
    const [data, setData] = useState<any>({
        name: '',
        summary: '',
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
                <SocialMedia data={data.socialMedia}/>
                <Rate rate={data.rating}/>

                {
                    !!data.summary && (
                        <Summary summary={data.summary}/>
                    )
                }


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
        isLoading ? <Loading/> :
            (
                <Box>
                    <Header
                        imageThumbnail={state.imageUrl}
                        imageBackground={"https://lh3.googleusercontent.com/DYIaU37AgOoki1s5dPLfw-dsd724OHpVXsP41_9kpNeKl-LWx6Za0Nf6QeTT7iRsLTYgSppzkzRLkw=w2880-h1200-p-l90-rj"}
                        name={state.name}/>
                    <Container>
                        {content}
                    </Container>
                </Box>
            )


    )
}