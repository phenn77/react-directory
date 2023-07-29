import React from "react"
import {Box} from "@mui/material";
import {retrieveImageUrl} from "../../../utils";
import {useNavigate} from "react-router-dom";

export const MemberList = (props: any) => {
    const navigate = useNavigate();

    const getInfo = (id: string, name: string, image: string) => {
        navigate('/member/view', {
            state: {
                id: id,
                name: name,
                imageUrl: image
            },
        });
    };

    return (
        <Box sx={{
            display: 'flex',
            overflowX: 'scroll',
            background: 'green'
        }}>
            {props.data.map((val: any) => (
                <Box
                    className={'member media-image'}
                    component="img"
                    sx={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '75px',
                        m: '20px'
                    }}
                    alt={val.name}
                    src={`${retrieveImageUrl(val.pictures[0])}?fit=contain`}
                    onClick={() => getInfo(val._id, val.name, val.pictures[0])}
                />
            ))}
        </Box>
    )
}