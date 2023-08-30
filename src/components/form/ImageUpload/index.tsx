import React from "react";
import {Box, Button} from "@mui/material";
import {DisplayPicture} from "../../ui";

interface ImageUploadInput {
    imageFile?: any,
    onChange: (event: any) => void
}

export const ImageUpload = (props: ImageUploadInput) => {
    const imageUrl: string | undefined = props.imageFile ? URL.createObjectURL(props.imageFile) : undefined;

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {
                imageUrl && (
                    <DisplayPicture
                        imageUrl={imageUrl}
                        name={'artist'}
                        directory={'artist'}
                    />
                )
            }
            <Box sx={{
                display: 'flex'
            }}>
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload File
                    <input
                        type="file"
                        accept={"image/*"}
                        onChange={props.onChange}
                        hidden
                        required
                    />
                </Button>
                <Button
                    sx={{
                        ml: '10px',
                        color: 'black'
                    }}
                >
                    Clear
                </Button>
            </Box>
        </Box>
    )
}