import React, {useEffect, useState} from 'react';
import {Box, Container} from "@mui/material";
import {IndexPagination} from "../Pagination";
import {fetchData} from "../../../services";
import {Loading} from "../Loading";
import {IndexData, IndexResponseProps} from "../../../variables/interface";
import {useLocation} from "react-router-dom";

interface HomeProps {
    title: string
}

export const Home = (props: HomeProps) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
    }, [location, page]);

    const retrieveData = () => {
        const timeout = setTimeout(() => {
            if (isLoading) {
                fetchData(
                    {
                        pageNumber: page,
                        directory: 'artist'
                    }
                ).then((res: IndexResponseProps) => {
                    setData(res);
                });
            }

            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }

    const handleChangePage = (page: number) => {
        setPage(page);
        setIsLoading(true);
        retrieveData();
    }

    const content = isLoading ? (
        <Loading/>
    ) : (
        <>
            <Container sx={{
                height: '85vh',
                overflowY: 'scroll'
            }}>
            </Container>
            <IndexPagination totalPage={data.totalPage}
                             page={page}
                             onChange={(event, value) => handleChangePage(value)}
            />
        </>
    );

    return (
        <Box sx={{
            width: 1
        }}>
            {content}
        </Box>
    );
}