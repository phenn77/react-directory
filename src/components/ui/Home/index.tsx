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
    const [page, setPage] = useState(1);
    const [data, setData] = useState<IndexData>({
            totalPage: 1,
            page: page,
            data: []
        }
    );

    useEffect(() => {
        document.title = props.title;

        retrieveData();
    }, []);

    const retrieveData = () => {
        console.log(page);
        setIsLoading(true);

        fetchData({directory: 'artist', pageNumber: page})
            .then((dt) => {
                setData(dt);
                setIsLoading(false);
            });
    }

    const handleChangePage = (page: number) => {
        setPage(page);

        retrieveData();
    }

    const content = isLoading ? (
        <>
            <Container sx={{
                height: '85vh',
                overflowY: 'scroll'
            }}>
            </Container>
            <IndexPagination totalPage={data.totalPage} page={data.page}/>
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
                <IndexPagination totalPage={20} page={page} onChange={() => handleChangePage(page)}/>
            </>
            {/*{content}*/}
        </Box>
    );
}