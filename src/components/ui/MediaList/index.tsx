import React from "react";
import {ImageList, ImageListItem} from "@mui/material";
import {MediaImage} from "../MediaImage";
import {retrieveImageUrl} from "../../../utils";

export const MediaList = (props: any) => {
    return (
        <ImageList cols={3}>
            {props.data.map((val: any) => (
                <ImageListItem
                    key={val._id}
                    sx={{
                        alignItems: 'center',
                    }}>
                    <MediaImage imageUrl={retrieveImageUrl(val.pictures[0])} name={val.name}/>
                </ImageListItem>
            ))}
        </ImageList>
    )
}