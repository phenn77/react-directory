import React from 'react';
import '../App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navbar} from "../components/ui";
import {Home} from "../components/ui";
import {View as ArtistView} from "./artist/view";
import {Add as ArtistAdd} from "../pages/artist/add";
import {View as AlbumView} from "./album/view";
import {NavbarRoutes} from "../variables/icon";

function App() {
    return (
        <div className="container">
            <BrowserRouter>
                <Navbar position={'right'} variant={'outlined'} data={NavbarRoutes}/>
                <Routes>
                    <Route path={"/"}/>

                    <Route path={"/artist"} element={<Home/>}/>
                    <Route path={"/artist/view"} element={<ArtistView/>}/>
                    <Route path={"/artist/add"} element={<ArtistAdd/>}/>

                    <Route path={"/album"} element={<Home/>}/>
                    <Route path={"/album/view"} element={<AlbumView/>}/>

                    <Route path={"/single"} element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
