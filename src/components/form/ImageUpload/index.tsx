import React from "react";
import { Box, Button } from "@mui/material";
import { DisplayPicture } from "../../ui";

interface ImageUploadInput {
    imageFile?: any,
    onChange: (event: any) => void,
    onClear: (event: any) => void
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
                    // <DisplayPicture
                    //     imageUrl={imageUrl}
                    //     name={'artist'}
                    //     directory={'artist'}
                    // />
                    <Box
                        component="img"
                        sx={{
                            my: '40px',
                            objectFit: 'cover',
                            width: {
                                sm: '160px',
                                md: '200px'
                            },
                            height: {
                                sm: '160px',
                                md: '200px'
                            },
                            borderRadius: {
                                sm: '80px',
                                md: '160px'
                            }
                        }}
                        src={imageUrl}
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
                    Image
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
                    disabled={!imageUrl}
                    onClick={props.onClear}
                >
                    Clear
                </Button>
            </Box>
        </Box>
    )
}