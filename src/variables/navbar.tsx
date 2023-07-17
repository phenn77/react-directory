import React from 'react';
import {Album, Group, LibraryMusic} from "@mui/icons-material";

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
