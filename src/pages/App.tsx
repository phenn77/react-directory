import React from 'react';
import '../App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navbar} from "../components/ui";
import {Home} from "../components/ui/Home";

function App() {
    return (
        // <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //       Edit <code>src/App.tsx</code> and save to reload.
        //     </p>
        //     <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        // </div>

        <div className="container">
            <BrowserRouter>
                <Navbar position={'left'} variant={'outlined'}/>
                <Navbar position={'right'} variant={'outlined'}/>
                <Routes>
                    <Route path="/"/>

                    <Route path="/artist" element={<Home title="ARTIST"/>}/>
                    {/*<Route path="/artist/view" element={<ArtistView/>}/>*/}

                    <Route path="/album" element={<Home title="ALBUM"/>}/>
                    {/*<Route path="/album/view" element={<AlbumView/>}/>*/}

                    <Route path="/single" element={<Home title="SINGLE"/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
