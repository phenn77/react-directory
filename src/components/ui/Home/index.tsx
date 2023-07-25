import React, {useEffect, useState} from 'react';
import {Box, Container} from "@mui/material";
import {IndexPagination} from "../Pagination";
import {fetchData} from "../../../services";
import {Loading} from "../Loading";
import {Directory, IndexData, IndexResponseProps} from "../../../variables/interfaces";
import {useLocation} from "react-router-dom";
import {ImageGallery} from "../ImageGallery";

export const Home = () => {
    const currentDirectory: string = useLocation().pathname.replace("/", "");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<IndexData>({
            totalPage: 1,
            page: 1,
            data: []
        }
    );

    useEffect(() => {
        document.title = currentDirectory.toUpperCase();
        retrieveData();
    }, [page]);

    const retrieveData = () => {
        setIsLoading(true);

        const timeout = setTimeout(() => {
            fetchData(
                {
                    pageNumber: page,
                    directory: currentDirectory as Directory
                }
            ).then((res: IndexResponseProps) => {
                setData(res);
                setIsLoading(false);
            });
        }, 3000);

        return () => clearTimeout(timeout);
    }

    const handleChangePage = (page: number) => {
        setPage(page);
    }

    const content = isLoading ? (
        <Loading/>
    ) : (
        <>
            <Container sx={{
                height: '85vh',
                overflowY: 'scroll'
            }}>
                <ImageGallery data={data.data}/>
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