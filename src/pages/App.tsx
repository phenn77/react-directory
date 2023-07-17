import React from 'react';
import '../App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navbar} from "../components/ui";

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
                <Navbar position={'top'} variant={'outlined'}/>
                <Navbar position={'left'} variant={'outlined'}/>
                <Navbar position={'bottom'} variant={'outlined'}/>
                <Navbar position={'right'} variant={'outlined'}/>
                <Routes>
                    <Route path="/"/>

                    {/*<Route path="/artist" element={<Index title="ARTIST"/>}/>*/}
                    {/*<Route path="/artist/view" element={<ArtistView/>}/>*/}

                    {/*<Route path="/album" element={<Index title="ALBUM"/>}/>*/}
                    {/*<Route path="/album/view" element={<AlbumView/>}/>*/}

                    {/*<Route path="/single" element={<Index title="SINGLE"/>}/>*/}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
