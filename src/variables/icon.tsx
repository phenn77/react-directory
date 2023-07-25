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
        sx={{
            fontSize: '30px'
        }}/>,
    instagram: <Instagram
        className={"instagram"}
        sx={{
            fontSize: '30px',
            borderRadius: '10px'
        }}/>,
    website: <Language
        color={'info'}
        sx={{
            fontSize: '30px'
        }}/>,
    facebook: <Facebook
        color={'primary'}
        sx={{
            fontSize: '30px'
        }}/>
}
