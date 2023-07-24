import React, {useEffect, useState} from "react";
import {Box, Container} from "@mui/material";
import {useLocation} from "react-router-dom";
import {getData} from "../../services/get";
import {Directory} from "../../variables/interface";
import {Loading} from "../../components/ui";

export const View = () => {
    const {state} = useLocation();
    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        document.title = state.name;

        retrieveData();
    }, []);

    const retrieveData = () => {
        const timeout = setTimeout(() => {
            if (isLoading) {
                getData(
                    {
                        id: state.id,
                        directory: state.directory as Directory
                    }
                ).then((res: any) => {
                    setData(res);
                });
            }

            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }

    const content = isLoading ?
        <Loading/> :
        (
            <Box>
                <Box
                    component="img"
                    sx={{
                        // height: 233,
                        // width: 350,
                        // maxHeight: {xs: 233, md: 167},
                        // maxWidth: {xs: 350, md: 250},
                    }}
                    alt={state.name}
                    src={`${state.imageUrl}?fit=contain`}
                />
            </Box>

        );

    return (
        <Container>
            {content}
        </Container>
    );
}