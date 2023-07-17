import React, {useEffect, useState} from 'react';
import {Box, Container} from "@mui/material";
import {IndexPagination} from "../Pagination";
import {fetchData} from "../../../services/common";


interface HomeProps {
    title: string
}

interface IndexData {
    totalPage: number
}

export const Home = (props: HomeProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<IndexData>();

    useEffect(() => {
        document.title = props.title;

        setIsLoading(true);

        fetchData({directory: 'artist', pageNumber:}).then((dt) => {
            setData(dt);
            setIsLoading(false);
        });
    });

    return (
        <Box sx={{
            width: 1
        }}>
            {data && (
                <>
                    <Container sx={{
                        height: '85vh',
                        overflowY: 'scroll'
                    }}>
                    </Container><IndexPagination totalPage={data.totalPage}/>
                </>
            )}
        </Box>
    );
}