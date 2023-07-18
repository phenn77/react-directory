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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<IndexData>({
            totalPage: 1,
            page: 1,
            data: []
        }
    );

    useEffect(() => {
        document.title = props.title;

        retrieveData();
    }, [page]);

    const retrieveData = () => {
        setIsLoading(true);

        fetchData({directory: 'artist', pageNumber: page})
            .then((dt: IndexData) => {
                setData(dt);
            });

        setIsLoading(false);
    }

    const handleChangePage = (page: number) => {
        setPage(page);

        console.log("Page: " + page);

        retrieveData();
    }

    const content = isLoading ? (
        <>
            <Container sx={{
                height: '85vh',
                overflowY: 'scroll'
            }}>
            </Container>
            <IndexPagination totalPage={data.totalPage} page={data.page} onChange={(event, value) => handleChangePage(value)}/>
        </>
    ) : (
        <Loading/>
    );

    return (
        <Box sx={{
            width: 1
        }}>
            {/*<>*/}
            {/*    <Container sx={{*/}
            {/*        height: '85vh',*/}
            {/*        overflowY: 'scroll'*/}
            {/*    }}>*/}
            {/*    </Container>*/}
            {/*    <IndexPagination totalPage={data.totalPage} page={data.page} onChange={(event, value) => handleChangePage(value)}/>*/}
            {/*</>*/}
            {content}
        </Box>
    );
}