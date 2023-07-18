import React, {useEffect, useState} from 'react';
import {Box, Container} from "@mui/material";
import {IndexPagination} from "../Pagination";
import {fetchData} from "../../../services";
import {Loading} from "../Loading";

interface HomeProps {
    title: string
}

interface IndexData {
    totalPage: number,
    page: number,
    data: []
}

export const Home = (props: HomeProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<IndexData>({
            totalPage: 1,
            page: 1,
            data: []
        }
    );

    useEffect(() => {
        document.title = props.title;

        setIsLoading(true);

        fetchData({directory: 'artist', pageNumber: 1})
            .then((dt) => {
                setData(dt);
                setIsLoading(false);
            });
    }, []);

    const content = isLoading ? (
        <>
            <Container sx={{
                height: '85vh',
                overflowY: 'scroll'
            }}>
            </Container>
            <IndexPagination totalPage={data.totalPage}/>
        </>
    ) : (
        <Loading/>
    );

    return (
        <Box sx={{
            width: 1
        }}>
            <>
                <Container sx={{
                    height: '85vh',
                    overflowY: 'scroll'
                }}>
                </Container>
                {/*<IndexPagination totalPage={data.totalPage}/>*/}
                <IndexPagination totalPage={20}/>
            </>
            {/*{content}*/}
        </Box>
    );
}