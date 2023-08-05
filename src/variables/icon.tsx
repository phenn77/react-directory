import React, {ReactElement} from 'react';
import {Album, Facebook, Group, Instagram, Language, LibraryMusic, Twitter} from "@mui/icons-material";

export const NavbarRoutes = [
    {
        url: "/artist",
        name: "artist",
        icon: <Group sx={{
            fontSize: '30px'
        }}/>
    },
    {
        url: "/album",
        name: "album",
        icon: <Album sx={{
            fontSize: '30px'
        }}/>
    },
    {
        url: "/single",
        name: "single",
        icon: <LibraryMusic sx={{
            fontSize: '30px'
        }}/>
    }
]

// export enum SocialMediaIcons {
//     twitterIcon= (<Twitter sx={{
//         fontSize: '30px'
//     }}/>)
//     // instagramIcon: <Instagram sx={{
//     //     fontSize: '30px'
//     // }}/>,
//     // websiteIcon: <Language sx={{
//     //     fontSize: '30px'
//     // }}/>,
// }
export const SocialMediaIcons: Record<string, ReactElement> = {
    twitter: <Twitter
        color={'primary'}
    />,
    instagram: <Instagram
        className={"instagram"}
        sx={{
            borderRadius: {
                sm: '10px',
                md: '15px'
            },
            color: '#f6f6f6'
        }}/>,
    website: <Language
        color={'info'}/>,
    facebook: <Facebook
        color={'primary'}
    />
}
